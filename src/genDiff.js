import _ from 'lodash';

import parse from './parsers';

import basic, { plain, json } from './formatters';

import isObject from './utils';

const formatter = { basic, plain, json };

const wasAltered = (value1, value2) => (
  _.isEqual(value1, value2) ? 'unaltered' : 'updated');

const generateAst = (before, after) => {
  const iter = (obj1, obj2, pathAcc, depthAcc) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    return keys.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const determineType = {
        truetrue: isObject(value1) && isObject(value2)
          ? 'complex'
          : wasAltered(value1, value2),
        truefalse: 'removed',
        falsetrue: 'added',
      };
      const type = determineType[`${_.has(obj1, key)}${_.has(obj2, key)}`];
      const path = pathAcc.concat([key]);
      const depth = depthAcc + 1;
      const children = type !== 'complex' ? null : iter(value1, value2, path, depth);
      return {
        ...acc,
        [key]: {
          type, path, depth, children,
        },
      };
    }, {});
  };
  return iter(before, after, [], -1);
};

export default (filepath1, filepath2, outputFormat) => {
  const before = parse(filepath1);
  const after = parse(filepath2);
  const diff = generateAst(before, after);
  return formatter[outputFormat](diff, before, after);
};
