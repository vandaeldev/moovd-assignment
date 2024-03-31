import { compare, hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { deleteActivity, deleteUser, getActivity, getActivityById, getExistingUsers, getUserById, getUserByName, patchUser, postActivity, postUser, putActivity } from './util/db.js';
import { Activity, ActivityArray, ActivityBody, ActivityID, LoginBody, RequestError, UserBody, UserID, UserPatchBody } from './util/validation.js';
import { CT_PROBLEM_JSON, PROBLEM_TYPE_URL } from './util/constants.js';
import type { FastifyPluginCallback } from 'fastify';
import type { Activity as TActivity, User as TUser, ViewActivity } from '@prisma/client';
import type { IRequestError, TActivityBody } from './types.d.ts';

export default ((app, _, done) => {
  app.route<{ Reply: ViewActivity[] }>({
    method: 'GET',
    url: '/activity',
    schema: { response: { [StatusCodes.OK]: ActivityArray } },
    handler: async (_, res) => {
      const activity = await getActivity();
      res.send(activity);
    }
  });

  app.route<{ Params: Pick<ViewActivity, 'id'>, Reply: ViewActivity }>({
    method: 'GET',
    url: '/activity/:id',
    schema: { params: ActivityID, response: { [StatusCodes.OK]: Activity } },
    handler: async (req, res) => {
      const activity = await getActivityById(+req.params.id);
      !activity ? res.callNotFound() : res.send(activity);
    }
  });

  app.route<{ Body: TActivityBody, Reply: Pick<TActivity, 'id'> }>({
    method: 'POST',
    url: '/activity',
    schema: { body: ActivityBody, response: { [StatusCodes.CREATED]: ActivityID } },
    handler: async (req, res) => {
      const activityId = await postActivity(req.body);
      res.code(StatusCodes.CREATED).send(activityId);
    }
  });

  app.route<{ Params: Pick<ViewActivity, 'id'>, Body: TActivityBody, Reply: Pick<TActivity, 'id'> }>({
    method: 'PUT',
    url: '/activity/:id',
    schema: { params: ActivityID, body: ActivityBody, response: { [StatusCodes.OK]: ActivityID } },
    handler: async (req, res) => {
      const activityId = await putActivity(+req.params.id, req.body);
      res.send(activityId);
    }
  });

  app.route<{ Params: Pick<ViewActivity, 'id'>, Reply: Pick<TActivity, 'id'> }>({
    method: 'DELETE',
    url: '/activity/:id',
    schema: { params: ActivityID, response: { [StatusCodes.OK]: ActivityID } },
    handler: async (req, res) => {
      const activityId = await deleteActivity(+req.params.id);
      res.send(activityId);
    }
  });

  app.route<{ Body: Pick<TUser, 'email' | 'username' | 'password'>, Reply: Pick<TUser, 'id'> | IRequestError }>({
    method: 'POST',
    url: '/signup',
    schema: { body: UserBody, response: { [StatusCodes.CREATED]: UserID, [StatusCodes.BAD_REQUEST]: RequestError } },
    handler: async (req, res) => {
      const { password, email, username } = req.body;
      const existing = await getExistingUsers(email, username);
      if (existing.length) return void res.code(StatusCodes.BAD_REQUEST).type(CT_PROBLEM_JSON).send({
        type: `${PROBLEM_TYPE_URL}/${StatusCodes.BAD_REQUEST}`,
        title: 'Bad Request',
        status: StatusCodes.BAD_REQUEST,
        detail: 'This user already exists.',
        instance: req.url
      });
      const hashed = await hash(password, 10);
      const userId = await postUser(email, username, hashed);
      res.code(StatusCodes.CREATED).send(userId);
    }
  });

  app.route<{ Body: Pick<TUser, 'username' | 'password'>, Reply: Pick<TUser, 'id'> }>({
    method: 'POST',
    url: '/login',
    schema: { body: LoginBody, response: { [StatusCodes.OK]: UserID } },
    handler: async (req, res) => {
      const { username, password } = req.body;
      const user = await getUserByName(username);
      if (!user) return void res.callNotFound();
      const match = await compare(password, user.password);
      match ? res.send({ id: user.id }) : res.callNotFound();
    }
  });

  app.route<{ Body: Partial<Pick<TUser, 'email' | 'username'>> & Pick<TUser, 'id'>, Reply: Pick<TUser, 'id'> }>({
    method: 'PATCH',
    url: '/user',
    schema: { body: UserPatchBody, response: { [StatusCodes.OK]: UserID } },
    handler: async (req, res) => {
      const { id, ...userData } = req.body;
      const user = await getUserById(+id!);
      if (!user) return void res.callNotFound();
      const userId = await patchUser(+id!, userData);
      res.send(userId);
    }
  });

  app.route<{ Params: Pick<TUser, 'id'>, Reply: Pick<TUser, 'id'> }>({
    method: 'DELETE',
    url: '/user/:id',
    schema: { params: UserID, response: { [StatusCodes.OK]: UserID } },
    handler: async (req, res) => {
      const { id } = req.params;
      const user = await getUserById(+id);
      if (!user) return void res.callNotFound();
      const userId = await deleteUser(+id);
      res.send(userId);
    }
  });

  done();
}) satisfies FastifyPluginCallback;