import { readFileSync } from 'fs';

import path from 'path';

import yaml from 'js-yaml';

import ini from 'ini';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

export default (filepath) => {
  const data = String(readFileSync(filepath));
  const ext = path.extname(filepath);
  return parsers[ext](data);
};
