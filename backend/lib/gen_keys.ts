import { env } from 'node:process';
import { promisify } from 'node:util';
import { access, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { generateKeyPair } from 'node:crypto';
import esMain from 'es-main';
import { ACC_PRIV, ACC_PUB, CERT_DIR, EC, KEY_FMT } from '../src/util/constants.js';
import type { ECKeyPairOptions, KeyPairSyncResult } from 'crypto';

const genKeyPair = promisify(generateKeyPair);

const keyConf: ECKeyPairOptions<`${typeof KEY_FMT}`, `${typeof KEY_FMT}`> = {
  namedCurve: env.KEY_CURVE!,
  publicKeyEncoding: { type: 'spki', format: KEY_FMT },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: KEY_FMT,
    cipher: env.KEY_CIPHER,
    passphrase: env.KEY_PHRASE
  }
};

const writeKeys = async ({ publicKey, privateKey }: KeyPairSyncResult<string, string>, [ pub, priv ]: [string, string]) => {
  const pubFile = join(CERT_DIR, `${pub}.${KEY_FMT}`);
  const privFile = join(CERT_DIR, `${priv}.${KEY_FMT}`);
  await Promise.all([writeFile(pubFile, publicKey), writeFile(privFile, privateKey)]);
  console.info(`created public key in ${pubFile}`);
  console.info(`created private key in ${privFile}`);
};

export const initKeys = async () => {
  try {
    try { await access(CERT_DIR) }
    catch { await mkdir(CERT_DIR) }
    try {
      await access(join(CERT_DIR, `${ACC_PUB}.${KEY_FMT}`));
      await access(join(CERT_DIR, `${ACC_PRIV}.${KEY_FMT}`));
      console.info(`using existing keys in '${CERT_DIR}'`);
    } catch {
      const keyPair = await genKeyPair(EC, keyConf);
      await writeKeys(keyPair, [ACC_PUB, ACC_PRIV]);
    }
  } catch (e) { console.error(e) }
};

esMain(import.meta) && (await initKeys());
