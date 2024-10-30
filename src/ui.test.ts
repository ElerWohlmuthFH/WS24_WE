// src/ui.test.ts
import { test, expect } from 'vitest';
import { renderBears } from './ui';

test('renderBears should render bear information', () => {
  document.body.innerHTML = '<div class="more_bears"></div>';
  renderBears([
    {
      name: 'Grizzly',
      binomial: 'Ursus arctos',
      image: 'image.jpg',
      range: 'North America',
    },
  ]);

  const bears = document.querySelectorAll('.more_bears div');
  expect(bears.length).toBe(1);
});
