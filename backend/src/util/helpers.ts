import { Prisma, ViewActivity } from '@prisma/client';
import { REVOKED } from './constants.js';
import type { FastifyRequest } from 'fastify';
import type { IActivityDetail, IActivityReply, TActivityBody } from '../types.d.ts';

export const constructActivityData = ({ device, deviceType, location, timestamp }: TActivityBody) => ({
  Device: {
    connectOrCreate: {
      create: {
        name: device!,
        DeviceType: {
          connectOrCreate: {
            create: { name: deviceType! },
            where: { name: deviceType! }
          }
        }
      },
      where: { name: device! }
    }
  },
  Location: {
    connectOrCreate: {
      create: { name: location! },
      where: { name: location! }
    }
  },
  timestamp: new Date(timestamp)
});

export const activityColumns = () => Prisma.dmmf.datamodel.models.find(a => a.name === 'ViewActivity')?.fields.map(({ name }) => name) as IActivityReply['columns'];

export const validateToken = (_: FastifyRequest, decodedToken: Record<string, unknown>) => REVOKED.includes(JSON.stringify(decodedToken)) ? false : decodedToken;

export const toActivityDetail = (device: string, activity: ViewActivity[]) => {
  if (!activity.length) return activity as [];
  let totalTime = 0;
  const timeAt = activity.reduce<IActivityDetail['timeAt']>((acc, { location }) => {
    totalTime += 5;
    let existingLocation = acc.find(l => l.location === location);
    if (existingLocation) existingLocation['time'] += 5;
    else acc.push({ location, time: 5 });
    return acc;
  }, []);
  return { device, deviceType: activity[0].deviceType, timeAt, totalTime } as IActivityDetail;
};