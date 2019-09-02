import { readFileSync } from 'fs';

import getDiff from '../src/parsers';

let path;
let diff;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
  diff = String(readFileSync(`${path}diff1`));
});

test('json', () => {
  const before1 = `${path}before.json`;
  const after1 = `${path}after.json`;
  expect(getDiff(before1, after1)).toBe(diff);
});

test('yaml', () => {
  const before2 = `${path}before.yml`;
  const after2 = `${path}after.yml`;
  expect(getDiff(before2, after2)).toBe(diff);
});

test('ini', () => {
  const before3 = `${path}before.ini`;
  const after3 = `${path}after.ini`;
  expect(getDiff(before3, after3)).toBe(diff);
});
