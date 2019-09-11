import _ from 'lodash';

import { readFileSync } from 'fs';

import { extname } from 'path';

import getParser from './parsers';

import getFormatter from './formatters';

import isObject from './utils';

const nodeTypes = [
  {
    type: 'complex',
    check: (first, second, key) => _.has(first, key) && _.has(second, key)
      && isObject(first[key]) && isObject(second[key]),
    process: (first, second, func) => func(first, second),
  },
  {
    type: 'same',
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

const getParsedConfig = (filepath) => {
  const data = readFileSync(filepath, 'utf-8');
  const configType = extname(filepath);
  const parse = getParser(configType);
  return parse(data);
};

export default (firstConfig, secondConfig, outputFormat) => {
  const first = getParsedConfig(firstConfig);
  const second = getParsedConfig(secondConfig);
  const diff = buildAst(first, second);
  const format = getFormatter(outputFormat);
  return format(diff);
};
