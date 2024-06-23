import { Surreal, type ConnectionOptions } from 'surrealdb.js';

export const getSurrealClient = async (host: string, options: ConnectionOptions) => {
  const client = new Surreal();
  await client.connect(host, options);
  return {
    client,
    [Symbol.asyncDispose]: async () => await client.close()
  };
};