#!/usr/bin/env node

import Fastify from 'fastify';
import { initClient } from './db.js';
import routes from './routes.js';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const fastify = Fastify({logger: {level: 'error'}}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(routes);
fastify.setErrorHandler((err, req, reply) => {
  fastify.log.error(err);
  const status = err.statusCode || 500;
  if (status < 500) return;
  reply.code(status).type('application/problem+json').send({
    type: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${status}`,
    title: 'A server error has occurred',
    status,
    detail: err.message,
    instance: req.url
  });
});

try {
  initClient();
  console.info('🚀 Listening on port 3000');
  await fastify.listen({ port: 3000 });
}
catch (err) {
  fastify.log.error(err);
}