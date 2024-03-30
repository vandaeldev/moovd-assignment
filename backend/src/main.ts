#!/usr/bin/env node

import Fastify from 'fastify';
import dbClient from './db.js';
import routes from './routes.js';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const fastify = Fastify({logger: {level: 'error'}}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(routes);
fastify.setErrorHandler((err, req, reply) => {
  fastify.log.error(err);
  if (err.statusCode! < 500) return;
  reply.code(err.statusCode || 500).type('application/problem+json').send({
    type: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${err.statusCode}`,
    title: 'A server error has occurred',
    status: err.statusCode,
    detail: err.message,
    instance: req.url
  });
});

try {
  console.info('🚀 Listening on port 3000');
  await fastify.listen({ port: 3000 });
}
catch (err) {
  fastify.log.error(err);
}