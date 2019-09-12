import { readFileSync } from 'fs';

import genDiff from '../src';

const buildFilepath = (filename, filetype) => `${__dirname}/__fixtures__/${filename}.${filetype}`;

it.each([['pretty', 'json'], ['plain', 'ini'], ['json', 'yml']])(
  'output format: "%s" configs type: %s',
  (outputFormat, configType) => {
    const first = buildFilepath('before', configType);
    const second = buildFilepath('after', configType);
    const diff = readFileSync(buildFilepath('diff', outputFormat), 'utf-8');
    expect(genDiff(first, second, outputFormat)).toBe(diff);
  },
);
