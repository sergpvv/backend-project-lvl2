import { readFileSync } from 'fs';

import { fromPairs } from 'lodash';

import genDiff from '../src/genDiff';

import { outputFormats } from '../src/utils';

const path = `${__dirname}/__fixtures__/`;

const configTypes = ['.json', '.yml', '.ini'];

const configsComplexity = ['simple', 'nested'];

const testDataSet = [...configsComplexity.entries()]
  .flatMap((complexity) => configTypes
    .flatMap((type) => outputFormats
      .map((format) => [complexity, type, format])));

const referenceDiffs = [...configsComplexity.keys()]
  .map((key) => fromPairs(outputFormats
    .map((format) => [
      format,
      readFileSync(`${path}diff${key}.${format}`, 'utf-8'),
    ])));

it.each(testDataSet)(
  '%s %s configs; output format: "%s"',
  ([i], type, format) => {
    const first = `${path}before${i}${type}`;
    const second = `${path}after${i}${type}`;
    const diff = genDiff(first, second, format);
    expect(diff).toBe(referenceDiffs[i][format]);
  },
);
