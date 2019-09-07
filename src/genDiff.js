import _ from 'lodash';

import parse from './parsers';

import formatters from './formatters';

import isObject from './utils';

const nodeTypes = [
  {
    type: 'complex',
    check: (first, second, key) => _.has(first, key) && _.has(second, key)
      && isObject(first[key]) && isObject(second[key]),
    process: (first, second, func) => func(first, second),
  },
  {
    type: 'unaltered',
    check: (first, second, key) => _.has(first, key) && _.has(second, key)
      && _.isEqual(first[key], second[key]),
    process: _.identity,
  },
  {
    type: 'updated',
    check: (first, second, key) => _.has(first, key) && _.has(second, key)
      && !_.isEqual(first[key], second[key]),
    process: (oldValue, newValue) => [oldValue, newValue],
  },
  {
    type: 'removed',
    check: (first, second, key) => _.has(first, key) && !_.has(second, key),
    process: _.identity,
  },
  {
    type: 'added',
    check: (first, second, key) => !_.has(first, key) && _.has(second, key),
    process: (undef, value) => value,
  },
];

const buildAst = (first, second) => _.union(_.keys(first), _.keys(second)).map((key) => {
  const { type, process } = _.find(nodeTypes, (item) => item.check(first, second, key));
  const value = process(first[key], second[key], buildAst);
  return { type, key, value };
});

const getFormatter = (outputFormat) => formatters[outputFormat];

export default (firstConfig, secondConfig, outputFormat) => {
  const first = parse(firstConfig);
  const second = parse(secondConfig);
  const diff = buildAst(first, second);
  const format = getFormatter(outputFormat);
  return format(diff);
};
