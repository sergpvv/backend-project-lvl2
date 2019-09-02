import { readFileSync } from 'fs';

import getDiff from '../src/parsers';

let path;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
});

test('json', () => {
  const before = `${path}before.json`;
  const after = `${path}after.json`;
  const diff = String(readFileSync(`${path}diff1`));
  expect(getDiff(before, after)).toBe(diff);
});

test('yaml', () => {
  const before = `${path}before.yml`;
  const after = `${path}after.yml`;
  const diff = String(readFileSync(`${path}diff1`));
  expect(getDiff(before, after)).toBe(diff);
});

test('ini', () => {
  const before = `${path}before.ini`;
  const after = `${path}after.ini`;
  const diff = String(readFileSync(`${path}diff1`));
  expect(getDiff(before, after)).toBe(diff);
});
