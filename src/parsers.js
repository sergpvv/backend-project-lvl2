import { safeLoad } from 'js-yaml';

import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.ini': parse,
};

export default parsers;
