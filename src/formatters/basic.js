import { get } from 'lodash';

import isObject from '../utils';

const stringify = (value, depth) => {
  if (!isObject(value)) { return `${value}\n`; }
  const result = Object.keys(value).reduce((acc, key) => (
    `${acc}${' '.repeat((depth + 1) * 4)}${key}: ${stringify(value[key], depth + 1)}`),
  '{\n');
  return `${result}${' '.repeat(depth * 4)}}\n`;
};

export default (diff, before, after) => {
  const iter = (ast, indentDepth) => {
    const result = Object.entries(ast)
      .reduce((acc, [key, {
        type, path, depth, children,
      }]) => {
        const indent = ' '.repeat(depth * 4 + 2);
        const value1 = stringify(get(before, path), depth + 1);
        const value2 = stringify(get(after, path), depth + 1);
        const toString = {
          unaltered: () => `${indent}  ${key}: ${value1}`,
          removed: () => `${indent}- ${key}: ${value1}`,
          added: () => `${indent}+ ${key}: ${value2}`,
          updated: () => `${indent}- ${key}: ${value1}${indent}+ ${key}: ${value2}`,
          complex: () => `${indent}  ${key}: ${iter(children, depth)}`,
        };
        return `${acc}${toString[type]()}`;
      }, '{\n');
    return `${result}${' '.repeat((indentDepth + 1) * 4)}}\n`;
  };
  return iter(diff, -1);
};
