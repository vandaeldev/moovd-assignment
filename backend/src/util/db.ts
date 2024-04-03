import { Prisma, PrismaClient } from '@prisma/client';
import { constructActivityData } from './helpers.js';
import type { TActivityBody } from '../types.d.ts';

let client: PrismaClient;

const getClient = () => client || initClient();

export default getClient;

export const initClient = () => {
  client ||= new PrismaClient();
  return client;
};

export const getActivity = getClient().viewActivity.findMany;

export const getActivityLatest = getClient().viewActivityLatest.findMany;

export const getActivityById = (id: number) => getClient().viewActivity.findUnique({ where: { id } });

export const getActivityFilter = (where: Prisma.ViewActivityWhereInput) => getClient().viewActivity.findMany({ where });

export const postActivity = (activity: TActivityBody) =>
  getClient().activity.create({
    data: constructActivityData(activity),
    select: { id: true }
  });

export const putActivity = (id: number, activity: TActivityBody) =>
  getClient().activity.update({
    where: { id },
    data: constructActivityData(activity),
    select: { id: true }
  });

export const deleteActivity = (id: number) =>
  getClient().activity.delete({
    where: { id },
    select: { id: true }
  });

export const getUserByName = (username: string) =>
  getClient().user.findFirst({
    where: {
      OR: [{ email: username }, { username }]
    },
    select: { id: true, password: true }
  });

export const getUserById = (id: number) =>
  getClient().user.findUnique({
    where: { id },
    select: { id: true, password: true }
  });

export const postUser = (email: string, username: string, password: string) => {
  const now = new Date();
  return getClient().user.create({
    data: { email, username, password, updatedAt: now, createdAt: now },
    select: { id: true }
  });
};

export const patchUser = (id: number, userData: Pick<Prisma.UserUpdateInput, 'email' | 'username'> = {}) =>
  getClient().user.update({
    data: { ...userData, updatedAt: new Date() },
    where: { id },
    select: { id: true }
  });

export const deleteUser = (id: number) =>
  getClient().user.delete({
    where: { id },
    select: { id: true }
  });

export const getExistingUsers = (email: string, username: string) =>
  getClient().user.findMany({
    where: {
      OR: [{ email }, { username }]
    },
    select: { id: true }
  });