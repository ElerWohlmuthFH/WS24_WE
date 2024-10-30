// src/fetch.test.ts
import { test, expect } from 'vitest';
import { fetchBearData } from './fetch';

test('fetchBearData should return bear data', async () => {
  const data = await fetchBearData();
  expect(data).toBeDefined();
});
