import { PrismaClient } from '@prisma/client';
import { IActivity } from '../types.js';

let client: PrismaClient;

const getClient = () => client || initClient();

export default getClient;

export const initClient = () => {
  client ||= new PrismaClient();
  return client;
};

export const getActivity = getClient().viewActivity.findMany;