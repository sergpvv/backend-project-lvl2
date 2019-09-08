import { readFileSync } from 'fs';

import genDiff from '../src/genDiff';

import { outputFormats } from '../src/utils';

const path = `${__dirname}/__fixtures__/`;

const configTypes = ['.json', '.yml', '.ini'];

const testDataSet = new Set([]);

const diff = {};

for (let i = 1; i <= 2; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    const format = outputFormats[j];
    diff[`${format}${i}`] = readFileSync(`${path}diff${i}.${format}`, 'utf-8');
    for (let k = 0; k < 3; k += 1) {
      testDataSet.add([i, configTypes[j], outputFormats[k]]);
    }
  }
}

it.each([...testDataSet])(
  `#%s %s => %s`,
  (n, ext, format) => {
    const first = `${path}before${n}${ext}`;
    const second = `${path}after${n}${ext}`;
    expect(genDiff(first, second, format)).toBe(diff[`${format}${n}`]);
  },
);
