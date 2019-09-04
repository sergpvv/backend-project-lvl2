import { readFileSync } from 'fs';

import getDiff from '../src/parsers';

let path;

beforeEach(() => {
  path = `${__dirname}/__fixtures__/`;
});

test.each([
  ['.json', 'before1', 'after1', 'diff'],
  ['.yml', 'before2', 'after2', 'diff'],
  ['.ini', 'before3', 'after3', 'diff'],
  ['.json', 'before', 'after', 'diff.tree'],
  ['.yml', 'before', 'after', 'diff.tree'],
  ['.ini', 'before', 'after', 'diff.tree']])(
  '%s',
  (ext, before, after, diff) => {
    const b = `${path}${before}${ext}`;
    const a = `${path}${after}${ext}`;
    expect(getDiff(b, a)).toBe(String(readFileSync(`${path}${diff}`)));
  },
);
