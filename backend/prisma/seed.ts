#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';
import data from './data.json';

const client = new PrismaClient();

const main = () => {
  const activity = data.map(a => client.activity.create({
    data: {
      Device: {
        connectOrCreate: {
          create: {
            name: a.deviceId,
            DeviceType: {
              connectOrCreate: {
                create: {name: a.deviceType},
                where: {name: a.deviceType}
              }
            }
          },
          where: {name: a.deviceId}
        }
      },
      Location: {
        connectOrCreate: {
          create: {name: a.location},
          where: {name: a.location}
        }
      },
      timestamp: new Date(a.timestamp)
    }
  }));
  return client.$transaction(activity);
};

try { await main() }
catch (e) {
  console.error(e);
  process.exit(1);
} finally { await client.$disconnect() }