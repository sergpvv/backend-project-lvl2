import { readFileSync } from 'fs';

import getDiff from '../src/parsers';

let path;
let diff;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
  diff = String(readFileSync(`${path}diff`));
});

test('json, yml', () => {
  expect(getDiff(`${path}before1.json`, `${path}after1.json`)).toBe(diff);
  expect(getDiff(`${path}before2.yml`, `${path}after2.yml`)).toBe(diff);
});

test('ini', () => {
  const before3 = `${path}before3.ini`;
  const after3 = `${path}after3.ini`;
  expect(getDiff(before3, after3)).toBe(diff);
});
