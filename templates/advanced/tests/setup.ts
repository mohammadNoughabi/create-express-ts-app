import { beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  // cleanup if needed
});
