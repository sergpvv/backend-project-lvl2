import isObject from '../utils';

const indentSpaces = 4;

const indent = (count) => ' '.repeat(count * indentSpaces);

const stringify = (data, depth) => {
  if (!isObject(data)) {
    return `${data}\n`;
  }
  const result = Object.entries(data)
    .map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`)
    .join('');
  return `{\n${result}${indent(depth)}}\n`;
};

const toString = (key, value, depth, marker) => `${indent(depth)}  ${marker} ${key}: ${stringify(value, depth + 1)}`;

const rendererTypes = {
  same: (key, value, depth) => toString(key, value, depth, ' '),
  removed: (key, value, depth) => toString(key, value, depth, '-'),
  added: (key, value, depth) => toString(key, value, depth, '+'),
  updated: (key, { oldValue, newValue }, depth) => [
    toString(key, oldValue, depth, '-'), toString(key, newValue, depth, '+')],
  complex: (key, value, depth, func) => [indent(depth + 1), `${key}: `, func(value, depth + 1)],
};

const getRenderer = (type) => rendererTypes[type];

export default (diff) => {
  const iter = (node, depth) => {
    const result = node.map(({ type, key, value }) => getRenderer(type)(
      key, value, depth, iter,
    ));
    return ['{\n', result, indent(depth), '}\n'];
  };
  return iter(diff, 0).flat(Infinity).join('');
};
