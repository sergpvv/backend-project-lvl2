import { readFileSync } from 'fs';

import path from 'path';

import _ from 'lodash';

import yaml from 'js-yaml';

import ini from 'ini';

const genDiff = (obj1, obj2) => {
  const result = _.union(_.keys(obj1), _.keys(obj2)).reduce((acc, key) => {
    const before = obj1[key];
    const after = obj2[key];
    const obj1HasKey = _.has(obj1, key);
    const obj2HasKey = _.has(obj2, key);
    if (_.isEqual(before, after)) {
      return `${acc}    ${key}: ${before}\n`;
    }
    if (obj1HasKey && obj2HasKey) {
      return `${acc}  - ${key}: ${before}\n  + ${key}: ${after}\n`;
    }
    if (obj1HasKey) {
      return `${acc}  - ${key}: ${before}\n`;
    }
    if (obj2HasKey) {
      return `${acc}  + ${key}: ${after}\n`;
    }
    return acc;
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
