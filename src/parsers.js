import { readFileSync } from 'fs';

import path from 'path';

import _ from 'lodash';

import yaml from 'js-yaml';

import ini from 'ini';

import isObject from './utils';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

export const parse = (filepath) => {
  const data = String(readFileSync(filepath));
  const ext = path.extname(filepath);
  return parsers[ext](data);
};

const stayPrevOrModified = (value1, value2) => (
  _.isEqual(value1, value2) ? 'unaltered' : 'updated');

export default (before, after) => {
  const iter = (obj1, obj2, pathAcc, depthAcc) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    return keys.reduce((keyAcc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const determineState = {
        truetrue: isObject(value1) && isObject(value2)
          ? 'complex'
          : stayPrevOrModified(value1, value2),
        truefalse: 'removed',
        falsetrue: 'added',
      };
      const state = determineState[`${_.has(obj1, key)}${_.has(obj2, key)}`];
      const valuepath = pathAcc.concat([key]);
      const depth = depthAcc + 1;
      const children = state !== 'complex' ? null : iter(value1, value2, valuepath, depth);
      return {
        ...keyAcc,
        [key]: {
          state, valuepath, depth, children,
        },
      };
    }, {});
  };
  return iter(before, after, [], -1);
};
