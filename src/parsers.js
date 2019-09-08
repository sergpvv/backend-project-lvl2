import { readFileSync } from 'fs';

import path from 'path';

import yaml from 'js-yaml';

import ini from 'ini';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

const getParser = (filetype) => parsers[filetype];

export default (filepath) => {
  const data = readFileSync(filepath, 'utf-8');
  const filetype = path.extname(filepath);
  const parse = getParser(filetype);
  return parse(data);
};
