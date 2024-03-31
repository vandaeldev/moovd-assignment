import { Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';
import { PROBLEM_TYPE_URL } from './constants.js';

export const UserBody = Type.Object({
  username: Type.String(),
  email: Type.String({format: 'email'}),
  password: Type.String()
}, {maxProperties: 3});

export const UserID = Type.Object({
  id: Type.Integer()
});

export const LoginBody = Type.Omit(UserBody, ['email']);

export const UserPatchBody = Type.Composite([UserID, Type.Partial(Type.Omit(UserBody, ['password']))]);

export const ActivityBody = Type.Object({
  deviceID: Type.String(),
  deviceType: Type.String(),
  timestamp: Type.String(),
  location: Type.String()
});

export const ActivityID = Type.Object({
  id: Type.Integer()
});

export const Activity = Type.Composite([ActivityBody, ActivityID]);

export const ActivityArray = Type.Array(Activity);

export const RequestError = Type.Object({
  type: Type.String({pattern: `^${PROBLEM_TYPE_URL}/4\\d{2}$`}),
  title: Type.String(),
  status: Type.Enum(StatusCodes),
  detail: Type.String(),
  instance: Type.String({pattern: '^(/\\w+)+$'})
});