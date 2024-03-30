import { StatusCodes } from 'http-status-codes';
import dbClient from './db.js';
import type { Activity } from '@prisma/client';
import type { FastifyPluginCallback } from 'fastify';

export default ((app, _, done) => {
  app.route<{ Reply: Activity[] }>({
    method: 'GET',
    url: '/activity',
    // schema: { response: { [StatusCodes.OK]: UserArray } },
    handler: async (_, res) => {
      const activity = await dbClient().activity.findMany();
      res.send(activity);
    }
  });

  // app.route<{ Params: Pick<Activity, 'ID'>, Reply: Activity | TErrorResponse }>({
  //   method: 'GET',
  //   url: '/activity/:id',
  //   // schema: { params: UserId, response: { [StatusCodes.OK]: User, [StatusCodes.NOT_FOUND]: RequestError } },
  //   handler: (req, res) => {
  //     !false ? res.code(StatusCodes.NOT_FOUND).send(0) : res.send(1);
  //   }
  // });

  // app.route<{ Body: Omit<Activity, 'ID'>, Reply: Activity }>({
  //   method: 'POST',
  //   url: '/activity',
  //   // schema: { body: UserBody, response: { [StatusCodes.CREATED]: User } },
  //   handler: (req, res) => {
  //     res.code(StatusCodes.CREATED).send(1);
  //   }
  // });

  // app.route<{ Params: Pick<Activity, 'ID'>, Body: Omit<Activity, 'id'>, Reply: Activity | TErrorResponse }>({
  //   method: 'PUT',
  //   url: '/activity/:id',
  //   // schema: { body: UserBody, response: { [StatusCodes.OK]: User, [StatusCodes.NOT_FOUND]: RequestError } },
  //   handler: (req, res) => {
  //     if (!activity.has(req.params.id)) return void res.code(StatusCodes.NOT_FOUND).send(userNotFound(req.params.id));
  //     const user = { ...req.body, id: req.params.id };
  //     activity.set(user.id, user);
  //     res.send(user);
  //   }
  // });

  // app.route<{ Params: Pick<Activity, 'ID'>, Body: Partial<Omit<Activity, 'id'>>, Reply: Activity | TErrorResponse }>({
  //   method: 'PATCH',
  //   url: '/activity/:id',
  //   // schema: { params: UserId, body: PartialUserBody, response: { [StatusCodes.OK]: User, [StatusCodes.NOT_FOUND]: RequestError } },
  //   handler: (req, res) => {
  //     const user = activity.get(req.params.id);
  //     if (!user) return void res.code(StatusCodes.NOT_FOUND).send(userNotFound(req.params.id));
  //     const patched = { ...user, ...req.body } as Activity;
  //     activity.set(patched.id!, patched);
  //     res.send(patched);
  //   }
  // });

  // app.route<{ Params: Pick<Activity, 'ID'>, Reply: void | TErrorResponse }>({
  //   method: 'DELETE',
  //   url: '/activity/:id',
  //   // schema: { params: UserId, response: { [StatusCodes.NO_CONTENT]: {}, [StatusCodes.NOT_FOUND]: RequestError } },
  //   handler: (req, res) => {
  //     if (!activity.has(req.params.id)) return void res.code(StatusCodes.NOT_FOUND).send(userNotFound(req.params.id));
  //     activity.delete(req.params.id);
  //     res.code(StatusCodes.NO_CONTENT).send();
  //   }
  // });

  done();
}) satisfies FastifyPluginCallback;