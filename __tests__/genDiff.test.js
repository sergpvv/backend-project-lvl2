import { readFileSync } from 'fs';

import genDiff from '../src/genDiff';

import { outputFormats } from '../src/utils';

const path = `${__dirname}/__fixtures__/`;

const inputFileTypes = ['.json', '.yml', '.ini'];

const testDataSet = new Set([]);

const diff = {};

for (let i = 1; i <= 2; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    const format = outputFormats[j];
    diff[`${format}${i}`] = String(readFileSync(`${path}diff${i}.${format}`));
    for (let k = 0; k < 3; k += 1) {
      testDataSet.add([i, inputFileTypes[j], outputFormats[k]]);
    }
  }
}

it.each([...testDataSet])(
  '#%s; input files: %s; output format: %s',
  (n, ext, format) => {
    const before = `${path}before${n}${ext}`;
    const after = `${path}after${n}${ext}`;
    expect(genDiff(before, after, format)).toBe(diff[`${format}${n}`]);
  },
);
