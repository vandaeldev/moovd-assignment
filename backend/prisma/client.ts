import { env } from 'node:process';
import { PrismaClient } from '@prisma/client';
import mssql from 'mssql';

export const getPrismaClient = () => {
  const client = new PrismaClient();
  return {
    client,
    [Symbol.asyncDispose]: async () => await client?.$disconnect()
  };
};

export const getMssqlPool = async () => {
  const client = await new mssql.ConnectionPool(env.MSSQL_CONN!).connect();
  return {
    client,
    [Symbol.asyncDispose]: async () => await client?.close()
  };
};
