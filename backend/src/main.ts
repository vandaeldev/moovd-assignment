#!/usr/bin/env node

import { exit, env } from 'node:process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Fastify, { FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';
import routes from './routes.js';
import getClient, { initClient } from './util/db.js';
import { CT_PROBLEM_JSON, ORIGIN_REGEX, PROBLEM_TYPE_URL, RATE_LIMIT } from './util/constants.js';
import { ACC_PRIV, ACC_PUB, CERT_DIR, JWT, KEY_FMT } from './util/constants.js';
import { validateToken } from './util/helpers.js';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyJWTOptions } from '@fastify/jwt';

const fastify = Fastify({ logger: { transport: { target: '@fastify/one-line-logger' } } })
  .withTypeProvider<TypeBoxTypeProvider>()
  .register(import('@fastify/rate-limit'), { max: RATE_LIMIT, timeWindow: '1 minute' })
  .register(import('@fastify/cors'), {
    origin: ['dev', 'test'].includes(env.NODE_ENV!) ? '*' : ORIGIN_REGEX,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  .register(import('@fastify/helmet'))
  .register(import('@fastify/jwt') as any, {
    secret: {
      private: {
        key: readFileSync(join(CERT_DIR, `${ACC_PRIV}.${KEY_FMT}`)),
        passphrase: env.KEY_PHRASE!
      },
      public: readFileSync(join(CERT_DIR, `${ACC_PUB}.${KEY_FMT}`))
    },
    sign: {
      algorithm: JWT.ALG,
      expiresIn: env.JWT_EXP || JWT.EXP,
      iss: env.JWT_ISS || JWT.ISS,
      aud: env.JWT_AUD || JWT.AUD
    },
    verify: {
      algorithms: [JWT.ALG],
      allowedIss: env.JWT_ISS || JWT.ISS,
      allowedAud: env.JWT_AUD || JWT.AUD
    },
    trusted: validateToken
  } satisfies FastifyJWTOptions)
  .decorate('auth', async (req: FastifyRequest) => void await req.jwtVerify())
  .register(routes, { prefix: '/v1' })
  .setErrorHandler((err, req, reply) => {
    fastify.log.error(err);
    const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    reply.code(status).type(CT_PROBLEM_JSON).send({
      type: `${PROBLEM_TYPE_URL}/${status}`,
      title: getReasonPhrase(status),
      status,
      detail: err.message,
      instance: req.url
    });
  })
  .setNotFoundHandler((req, reply) => {
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