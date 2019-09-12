import pretty from './pretty';

import plain from './plain';

import json from './json';

const formatters = { pretty, plain, json };

export const outputFormats = ['pretty', 'plain', 'json'];

export default (outputFormat) => formatters[outputFormat];
