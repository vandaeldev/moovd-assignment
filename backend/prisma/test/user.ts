import { hash } from 'bcrypt';
import getClient from '../../src/util/db.js';

export const createUser = async (email: string, username: string, password: string) => {
  const hashed = await hash(password, 10);
  const now = new Date();
  const result = await getClient().user.create({
    data: { email, username, password: hashed, updatedAt: now, createdAt: now }
  });
  return result;
};

export const clearUsers = getClient().user.deleteMany;