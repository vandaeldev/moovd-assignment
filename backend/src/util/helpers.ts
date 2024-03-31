import { ORIGIN_REGEX } from './constants.js';
import type { OriginFunction } from '@fastify/cors';
import type { TActivityBody } from '../types.js';

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