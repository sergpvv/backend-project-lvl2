import { readFileSync } from 'fs';

import getDiff from '../src/parsers';

let path;
let diff;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
  diff = String(readFileSync(`${path}diff`));
});

test.each([
  ['.json', 'before1', 'after1'],
  ['.yml', 'before2', 'after2'],
  ['.ini', 'before3', 'after3']])(
  '%s',
  (ext, before, after) => {
    const b = `${path}${before}${ext}`;
    const a = `${path}${after}${ext}`;
    expect(getDiff(b, a)).toBe(diff);
  },
);
