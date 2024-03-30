import { PrismaClient } from '@prisma/client';

let client: PrismaClient;

export default (): PrismaClient => {
  client ||= new PrismaClient();
  return client;
};