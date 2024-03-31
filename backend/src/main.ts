#!/usr/bin/env node

import { exit, env } from 'node:process';
import Fastify from 'fastify';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';
import routes from './routes.js';
import getClient, { initClient } from './util/db.js';
import { CT_PROBLEM_JSON, ORIGIN_REGEX, PROBLEM_TYPE_URL } from './util/constants.js';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const fastify = Fastify({ logger: { transport: { target: '@fastify/one-line-logger' } } }).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(import('@fastify/rate-limit'), {max: 1, timeWindow: '1 minute'});
fastify.register(import('@fastify/cors'), {
  origin: ['dev', 'test'].includes(env.NODE_ENV!) ? '*' : ORIGIN_REGEX,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
fastify.register(import('@fastify/helmet'));
fastify.register(routes, { prefix: '/v1' });
fastify.setErrorHandler((err, req, reply) => {
  fastify.log.error(err);
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(status).type(CT_PROBLEM_JSON).send({
    type: `${PROBLEM_TYPE_URL}/${status}`,
    title: getReasonPhrase(status),
    status,
    detail: err.message,
    instance: req.url
  });
});
fastify.setNotFoundHandler((req, reply) => {
  const status = StatusCodes.NOT_FOUND;
  reply.code(status).type(CT_PROBLEM_JSON).send({
    type: `${PROBLEM_TYPE_URL}/${status}`,
    title: ReasonPhrases.NOT_FOUND,
    status,
    detail: 'The requested resource was not found.',
    instance: req.url
  });
});

try {
  initClient();
  await fastify.listen({ port: +(env.PORT || 3000) });
} catch (err) {
  getClient()?.$disconnect();
  fastify.log.error(err);
  exit(1);
}