#!/usr/bin/env tsx

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import mssql, { type IResult } from 'mssql';
import data from './data.json';

const client = new PrismaClient();
const mssqlPool = new mssql.ConnectionPool(process.env.MSSQL_CONN!);
await mssqlPool.connect();

const createViews = async () => {
  const viewFolder = join(import.meta.dirname, 'views', 'dbo');
  const viewFiles = readdirSync(viewFolder);
  const viewQueries = viewFiles.reduce<Promise<IResult<void>>[]>((acc, filename) => {
    const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    if (ext !== 'sql') return acc;
    const sql = readFileSync(join(viewFolder, filename), 'utf8');
    const query = `CREATE OR ALTER VIEW [dbo].[${filename.replace('.sql', '')}] AS ${sql}`;
    return acc.concat(mssqlPool.query(query));
  }, []);
  return Promise.all(viewQueries);
};

const createActivity = () => {
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

try {
  await Promise.all([
    createViews(),
    createActivity()
  ]);
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  client.$disconnect();
  mssqlPool.close();
}