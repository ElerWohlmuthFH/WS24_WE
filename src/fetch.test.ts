import { test, expect, vi } from 'vitest';

import { fetchBearData } from './fetch';

// Mocking the fetch function to simulate a response
global.fetch = vi.fn().mockResolvedValue({
  json: async () => ({
    parse: { wikitext: { '*': 'Mocked bear data' } },
  }),
});

test('fetchBearData should return bear data', async () => {
  const data = await fetchBearData();
  expect(data).toBeDefined(); // Expecting mocked data to be defined
});
