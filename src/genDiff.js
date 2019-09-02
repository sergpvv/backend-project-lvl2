import { readFileSync } from 'fs';

import path from 'path';

import _ from 'lodash';

import yaml from 'js-yaml';

const findDiff = (obj1, obj2) => {
  const result = _.union(_.keys(obj1), _.keys(obj2)).reduce((acc, key) => {
    let newAcc = acc;
    if (_.has(obj2, key)) {
      if (_.has(obj1, key)) {
        if (_.isEqual(obj1[key], obj2[key])) {
          newAcc = `${acc}    ${key}: ${obj1[key]}\n`;
        } else {
          newAcc = `${acc}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
        }
      } else {
        newAcc = `${acc}  + ${key}: ${obj2[key]}\n`;
      }
    } else {
      newAcc = `${acc}  - ${key}: ${obj1[key]}\n`;
    }
    return newAcc;
  }, '{\n');
  return `${result}}\n`;
};

const parseFunc = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
};

const parse = (filepath) => {
  const data = String(readFileSync(filepath));
  const ext = path.extname(filepath);
  return parseFunc[ext](data);
};

export default (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  return findDiff(obj1, obj2);
};
