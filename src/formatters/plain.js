import isObject from '../utils';

const isNumber = (value) => !Number.isNaN(Number(value));

const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (isNumber(value)) {
    return Number(value);
  }
  return `'${value}'`;
};

const toString = (path) => `Property '${path.join('.')}' was`;

const rendererTypes = {
  unaltered: (path) => `${toString(path)} been unlatered\n`,
  removed: (path) => `${toString(path)} removed\n`,
  added: (path, value) => `${toString(path)} added with value: ${stringify(value)}\n`,
  updated: (path, [oldValue, newValue]) => (
    `${toString(path)} updated. From ${stringify(oldValue)} to ${stringify(newValue)}\n`),
  complex: (path, value, func) => func(path, value),
};

const getRenderer = (type) => rendererTypes[type];

export default (diff) => {
  const iter = (pathAcc, node) => node.map(
    ({ type, key, value }) => getRenderer(type)([...pathAcc, key], value, iter),
  ).join('');
  return iter([], diff);
};
