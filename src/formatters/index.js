import basic from './basic';

import plain from './plain';

import json from './json';

const formatters = {
  plusminus: basic,
  basic,
  plain,
  json,
};

export const outputFormats = ['plusminus', 'plain', 'json'];

export default (outputFormat) => formatters[outputFormat];
