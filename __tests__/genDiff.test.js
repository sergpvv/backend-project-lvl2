import { readFileSync } from 'fs';

import { genDiff } from '../src';

let path;
let json1;
let json2;
let plain1;
let plain2;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
  json1 = String(readFileSync(`${path}json1`));
  json2 = String(readFileSync(`${path}json2`));
  plain1 = String(readFileSync(`${path}plain1`));
  plain2 = String(readFileSync(`${path}plain2`));
});

test.each([['.json'], ['.yml'], ['.ini']])(
  'input: %s; outupt: json',
  (ext) => {
    const b1 = `${path}before1${ext}`;
    const a1 = `${path}after1${ext}`;
    expect(genDiff(b1, a1, 'json')).toBe(json1);

    const b2 = `${path}before2${ext}`;
    const a2 = `${path}after2${ext}`;
    expect(genDiff(b2, a2, 'json')).toBe(json2);
  },
);

test.each([['.json'], ['.yml'], ['.ini']])(
  'input: %s; output: plain',
  (ext) => {
    const b1 = `${path}before1${ext}`;
    const a1 = `${path}after1${ext}`;
    expect(genDiff(b1, a1, 'plain')).toBe(plain1);

    const b2 = `${path}before2${ext}`;
    const a2 = `${path}after2${ext}`;
    expect(genDiff(b2, a2, 'plain')).toBe(plain2);
  },
);
