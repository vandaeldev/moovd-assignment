import { Prisma } from '@prisma/client';
import { REVOKED } from './constants.js';
import type { FastifyRequest } from 'fastify';
import type { IActivityReply, TActivityBody } from '../types.d.ts';

export const constructActivityData = ({ deviceID, deviceType, location, timestamp }: TActivityBody) => ({
  Device: {
    connectOrCreate: {
      create: {
        name: deviceID!,
        DeviceType: {
          connectOrCreate: {
            create: { name: deviceType! },
            where: { name: deviceType! }
          }
        }
      },
      where: { name: deviceID! }
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