#!/usr/bin/env tsx

import { exit } from 'node:process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { type IResult } from 'mssql';
import data from './data.json';
import { constructActivityData } from '../src/util/helpers.js';
import { getMssqlPool, getPrismaClient } from './client.js';

await using prismaDB = getPrismaClient();
await using mssqlDB = await getMssqlPool();

const createViews = async () => {
  const viewFolder = join(import.meta.dirname, 'views', 'dbo');
  const viewFiles = readdirSync(viewFolder);
  const viewQueries = viewFiles.reduce<Promise<IResult<void>>[]>((acc, filename) => {
    const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    if (ext !== 'sql') return acc;
    const sql = readFileSync(join(viewFolder, filename), 'utf8');
    const query = `CREATE OR ALTER VIEW [dbo].[${filename.replace('.sql', '')}] AS ${sql}`;
    return acc.concat(mssqlDB.client.query(query));
  }, []);
  return Promise.all(viewQueries);
};

const createActivity = () => {
  const activity = data.map(a => prismaDB.client.activity.create({
    data: constructActivityData(a)
  }));
  return prismaDB.client.$transaction(activity);
};

try {
  await Promise.all([
    createViews(),
    createActivity()
  ]);
} catch (e) {
  console.error(e);
  exit(1);
}