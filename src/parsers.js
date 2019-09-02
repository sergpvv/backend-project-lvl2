import { readFileSync } from 'fs';

import path from 'path';

import _ from 'lodash';

import yaml from 'js-yaml';

import ini from 'ini';

const map = (bool1, bool2) => `${bool1}${bool2}`;

const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.reduce((acc, key) => {
    const before = `${key}: ${obj1[key]}\n`;
    const after = `${key}: ${obj2[key]}\n`;
    const changes = {
      truetrue: (_.isEqual(before, after)
        ? `    ${before}`
        : `  - ${before}  + ${after}`),
      truefalse: `  - ${before}`,
      falsetrue: `  + ${after}`,
    };
    return `${acc}${changes[map(_.has(obj1, key), _.has(obj2, key))]}`;
  }, '{\n');
  return `${result}}\n`;
};

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

const parse = (filepath) => {
  const data = String(readFileSync(filepath));
  const ext = path.extname(filepath);
  return parsers[ext](data);
};

export default (filepath1, filepath2) => genDiff(parse(filepath1), parse(filepath2));
