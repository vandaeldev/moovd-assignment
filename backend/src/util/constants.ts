import { join } from 'node:path';

export const CT_PROBLEM_JSON = 'application/problem+json';
export const PROBLEM_TYPE_URL = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status';
export const ORIGIN_REGEX = /^http:\/\/(localhost|127.0.0.1|\[::1\]){1}:4200$/;
export const RATE_LIMIT = 100;

export const CERT_DIR = join(import.meta.dirname, '..', '..', 'cert');
export const EC = 'ec';
export const ACC_PRIV = 'access_private';
export const ACC_PUB = 'access_public';
export const KEY_FMT = 'pem';
export const JWT = {
  ALG: 'ES512',
  ISS: 'urn:moovd-assignment:backend',
  AUD: 'urn:moovd-assignment:frontend',
  EXP: '30m',
  REGEX: '/eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_.+/]*/g'
} as const;

export const REVOKED: string[] = [];