import { get } from 'lodash';

import isObject from '../utils';

const isNumber = (value) => !Number.isNaN(Number(value));

const stringify = (value) => {
  if (isObject(value)) { return '[complex value]'; }
  if (typeof value === 'boolean') { return value; }
  if (isNumber(value)) { return Number(value); }
  return `'${value}'`;
};

export default (diff, before, after) => {
  const iter = (ast) => {
    const entries = Object.entries(ast);
    const result = entries.reduce((acc, [, {
      type, path, children,
    }]) => {
      const value1 = stringify(get(before, path));
      const value2 = stringify(get(after, path));
      const property = `Property '${path.join('.')}' was`;
      const toString = {
        unaltered: () => `${property} been unlatered\n`,
        removed: () => `${property} removed\n`,
        added: () => `${property} added with value: ${value2}\n`,
        updated: () => `${property} updated. From ${value1} to ${value2}\n`,
        complex: () => iter(children),
      };
      return `${acc}${toString[type]()}`;
    }, '');
    return `${result}`;
  };
  return iter(diff);
};
