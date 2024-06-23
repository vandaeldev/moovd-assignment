#!/usr/bin/env -S pnpm tsx

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { env, exit } from 'node:process';
import { getSurrealClient } from './client.js';

await using surrealDB = await getSurrealClient(env.DB_URL!, {
  namespace: env.DB_NAMESPACE!,
  database: env.DB_NAME!,
  auth: {
    username: env.DB_USER!,
    password: env.DB_PASS!
  }
});

const initDatabase = () => surrealDB.client.query(`
  DEFINE NAMESPACE IF NOT EXISTS ${env.DB_NAMESPACE!};
  USE NS ${env.DB_NAMESPACE!};
  DEFINE DATABASE IF NOT EXISTS ${env.DB_NAME!};
  USE DB ${env.DB_NAME!};
`);

const execScript = (name: `${string}.surql`) => {
  const scriptPath = join(import.meta.dirname, 'surreal', name);
  const transaction = readFileSync(scriptPath, 'utf8');
  return surrealDB.client.query(transaction);
};

try {
  await initDatabase();
  await execScript('structure.surql');
  await execScript('data.surql');
} catch (e) {
  console.error(e);
  exit(1);
}