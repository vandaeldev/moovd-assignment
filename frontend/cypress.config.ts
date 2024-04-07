import { defineConfig } from 'cypress';
import { clearUsers, createUser } from '../backend/prisma/test/user.js';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    env: {
      EMAIL: 'test@test.local',
      USERNAME: 'testuser',
      PASSWORD: 'testpassword'
    },
    setupNodeEvents: on => {
      on('task', {
        'user:create': (user: { email: string; username: string; password: string }) => {
          return createUser(user.email, user.username, user.password);
        },
        'user:clear': () => {
          return clearUsers();
        }
      });
    }
  }
});
