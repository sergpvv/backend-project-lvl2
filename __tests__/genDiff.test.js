import { readFileSync } from 'fs';

import { fromPairs } from 'lodash';

import genDiff, { outputFormats } from '../src';

const buildFilepath = (name, tail, type) => `${__dirname}/__fixtures__/${name}${tail}${type}`;

const configTypes = ['.json', '.yml', '.ini'];

const diffTypes = { plusminus: 'basic', plain: 'plain', json: 'json' };

const configsComplexity = ['simple', 'nested'];

const testDataSet = [...configsComplexity.entries()]
  .flatMap(([index, complexity]) => configTypes
    .flatMap((type) => outputFormats
      .map((format) => [index, complexity, type, format])));

const referenceDiffs = [...configsComplexity.keys()]
  .map((key) => fromPairs(outputFormats
    .map((format) => [
      diffTypes[format],
      readFileSync(buildFilepath('diff', key, `.${diffTypes[format]}`), 'utf-8'),
    ])));

it.each(testDataSet)(
  '#%s %s %s configs; output format: "%s"',
  (indexComplexity, complexity, configType, outputFormat) => {
    const first = buildFilepath('before', indexComplexity, configType);
    const second = buildFilepath('after', indexComplexity, configType);
    const diff = referenceDiffs[indexComplexity][diffTypes[outputFormat]];
    expect(genDiff(first, second, outputFormat)).toBe(diff);
  },
);
