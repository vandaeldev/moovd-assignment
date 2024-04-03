import { Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';
import { JWT, PROBLEM_TYPE_URL } from './constants.js';

export const UserBody = Type.Object({
  username: Type.String({minLength: 8, maxLength: 32}),
  email: Type.String({format: 'email'}),
  password: Type.String({minLength: 8, maxLength: 32})
}, {maxProperties: 3});

export const UserID = Type.Object({
  id: Type.Integer({minimum: 1})
});

export const LoginResponse = Type.Object({
  token: Type.String({pattern: JWT.REGEX})
});

export const LoginBody = Type.Omit(UserBody, ['email']);

export const UserPatchBody = Type.Composite([UserID, Type.Partial(Type.Omit(UserBody, ['password']))]);

export const ActivityBody = Type.Object({
  device: Type.String({ pattern: '^D-\\d{4}$' }),
  deviceType: Type.String({minLength: 2, maxLength: 8}),
  timestamp: Type.String({format: 'date-time'}),
  location: Type.String({minLength: 2, maxLength: 2})
});

export const ActivityID = Type.Object({
  id: Type.Integer({minimum: 1})
});

export const ActivityName = Type.Object({
  device: Type.String()
});

export const Activity = Type.Composite([ActivityBody, ActivityID]);

export const ActivityArray = Type.Array(Activity);

export const ActivityResponse = Type.Object({
  columns: Type.Array(Type.String()),
  data: ActivityArray
});

export const LocationTime = Type.Object({
  location: Type.String(),
  time: Type.Integer({minimum: 5})
});

export const ActivityDetail = Type.Object({
  device: Type.String(),
  deviceType: Type.String(),
  timeAt: Type.Array(LocationTime),
  totalTime: Type.Integer({minimum: 5})
});

export const RequestError = Type.Object({
  type: Type.String({pattern: `^${PROBLEM_TYPE_URL}/4\\d{2}$`}),
  title: Type.String(),
  status: Type.Enum(StatusCodes),
  detail: Type.String(),
  instance: Type.String({pattern: '^(/\\w+)+$'})
});