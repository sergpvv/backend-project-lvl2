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
      state, valuepath, children,
    }]) => {
      const value1 = stringify(get(before, valuepath));
      const value2 = stringify(get(after, valuepath));
      const property = `Property '${valuepath.join('.')}' was`;
      const print = {
        unaltered: () => `${property} been unlatered\n`,
        removed: () => `${property} removed\n`,
        added: () => `${property} added with value: ${value2}\n`,
        updated: () => `${property} updated. From ${value1} to ${value2}\n`,
        complex: () => iter(children),
      };
      return `${acc}${print[state]()}`;
    }, '');
    return `${result}`;
  };
  return iter(diff);
};
