import { StatusCodes } from 'http-status-codes';
import { PROBLEM_TYPE_URL } from './util/constants.ts';
import type { ViewActivity } from '@prisma/client';
import { onRequestAsyncHookHandler } from 'fastify';

export type TActivityBody = Omit<ViewActivity, 'timestamp' | 'id'> & { timestamp: string };

export interface IRequestError {
  type: `${typeof PROBLEM_TYPE_URL}/${StatusCodes}`;
  title: string;
  status: StatusCodes;
  detail: string;
  instance: string;
}

export type TWithAuth<T> = T & { auth?: onRequestAsyncHookHandler };