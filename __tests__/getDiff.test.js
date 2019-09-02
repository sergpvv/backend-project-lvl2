import { readFileSync } from 'fs';

import getDiff from '../src/parsers';

let path;
let diff;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
  diff = String(readFileSync(`${path}diff`));
});

test('json', () => {
  const before1 = `${path}before1.json`;
  const after1 = `${path}after1.json`;
  expect(getDiff(before1, after1)).toBe(diff);
});

test('yaml', () => {
  const before2 = `${path}before2.yml`;
  const after2 = `${path}after2.yml`;
  expect(getDiff(before2, after2)).toBe(diff);
});

test('ini', () => {
  const before3 = `${path}before3.ini`;
  const after3 = `${path}after3.ini`;
  expect(getDiff(before3, after3)).toBe(diff);
});
