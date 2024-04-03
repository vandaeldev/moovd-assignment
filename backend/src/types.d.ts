import { StatusCodes } from 'http-status-codes';
import { PROBLEM_TYPE_URL } from './util/constants.ts';
import type { onRequestAsyncHookHandler } from 'fastify';
import type { ViewActivity } from '@prisma/client';

export type TActivityBody = Omit<ViewActivity, 'timestamp' | 'id'> & { timestamp: string };

export type TWithAuth<T> = T & { auth?: onRequestAsyncHookHandler };

export interface IRequestError {
  type: `${typeof PROBLEM_TYPE_URL}/${StatusCodes}`;
  title: string;
  status: StatusCodes;
  detail: string;
  instance: string;
}

export interface IActivityReply {
  columns: (keyof ViewActivity)[];
  data: ViewActivity[],
}