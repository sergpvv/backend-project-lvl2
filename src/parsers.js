import { readFileSync } from 'fs';

import path from 'path';

import _ from 'lodash';

import yaml from 'js-yaml';

import ini from 'ini';

const twoBoolToString = (bool1, bool2) => `${bool1}${bool2}`;

const isObject = (value) => !(value instanceof Array) && (value instanceof Object);

const stringify = (value, depth) => (isObject(value)
  ? _.keys(value)
    .map((key) => `{\n${' '.repeat((depth + 1) * 4)}${key}: ${value[key]}\n${' '.repeat(depth * 4)}}`)
    .join('')
  : value);

const render = (diff, before, after) => {
  const iter = (ast, depthIndent) => {
    const entries = Object.entries(ast);
    const result = entries.reduce((acc, [key, {
      state, valuepath, depth, children,
    }]) => {
      const indent = ' '.repeat(depth * 4 + 2);
      const value1 = stringify(_.get(before, valuepath), depth + 1);
      const value2 = stringify(_.get(after, valuepath), depth + 1);
      const print = {
        stayprev: () => `${indent}  ${key}: ${value1}\n`,
        deleted: () => `${indent}- ${key}: ${value1}\n`,
        added: () => `${indent}+ ${key}: ${value2}\n`,
        modified: () => `${indent}- ${key}: ${value1}\n${indent}+ ${key}: ${value2}\n`,
        nested: () => `${indent}  ${key}: ${iter(children, depth)}`,
      };
      return `${acc}${print[state]()}`;
    }, '{\n');
    return `${result}${' '.repeat((depthIndent + 1) * 4)}}\n`;
  };
  return iter(diff, -1);
};

const stayPrevOrModified = (value1, value2) => (
  _.isEqual(value1, value2) ? 'stayprev' : 'modified');

const generateDifferences = (before, after) => {
  const iter = (obj1, obj2, pathAcc, depthAcc) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    return keys.reduce((keyAcc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const determineState = {
        truetrue: isObject(value1) && isObject(value2)
          ? 'nested'
          : stayPrevOrModified(value1, value2),
        truefalse: 'deleted',
        falsetrue: 'added',
      };
      const state = determineState[twoBoolToString(_.has(obj1, key), _.has(obj2, key))];
      const valuepath = pathAcc.concat([key]);
      const depth = depthAcc + 1;
      const children = state !== 'nested' ? null : iter(value1, value2, valuepath, depth);
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

export default (filepath1, filepath2) => {
  const before = parse(filepath1);
  const after = parse(filepath2);
  const diff = generateDifferences(before, after);
  const result = render(diff, before, after);
  // console.log(JSON.stringify(diff, null, '  '));
  // console.log(result);
  return result;
};
