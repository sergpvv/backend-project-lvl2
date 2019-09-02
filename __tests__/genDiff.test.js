import { readFileSync } from 'fs';

import genDiff from '../src/genDiff';

test('plain json', () => {
  const path = './__tests__/__fixtures__/';
  const before = path + 'before.json';
  const after = path + 'after.json';
  const diff = String(readFileSync(path + 'diff1'));
  expect(genDiff(before, after)).toBe(diff);
});
