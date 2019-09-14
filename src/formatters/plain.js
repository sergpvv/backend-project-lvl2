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
  same: (path) => `${toString(path)} been unlatered`,
  removed: (path) => `${toString(path)} removed`,
  added: (path, value) => `${toString(path)} added with value: ${stringify(value)}`,
  updated: (path, { oldValue, newValue }) => (
    `${toString(path)} updated. From ${stringify(oldValue)} to ${stringify(newValue)}`),
  complex: (path, value, func) => func(path, value),
};

const getRenderer = (type) => rendererTypes[type];

export default (diff) => {
  const iter = (pathAcc, node) => node.map(
    ({ type, key, value }) => getRenderer(type)([...pathAcc, key], value, iter),
  ).join('\n');
  return `${iter([], diff)}\n`;
};
