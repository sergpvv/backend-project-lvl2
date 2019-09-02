import { readFileSync } from 'fs';

import * as _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const result = _.union(_.keys(obj1), _.keys(obj2)).reduce((acc, key) => {
    let newAcc = acc;
    if (_.has(obj2, key)) {
      if (_.has(obj1, key)) {
        if (_.isEqual(obj1[key], obj2[key])) {
          newAcc = `${acc}    ${key}: ${obj1[key]}\n`;
        } else {
          newAcc = `${acc}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
        }
      } else {
        newAcc = `${acc}  + ${key}: ${obj2[key]}\n`;
      }
    } else {
      newAcc = `${acc}  - ${key}: ${obj1[key]}\n`;
    }
    return newAcc;
  }, '{\n');
  return `${result}}\n`;
};

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(filepath1));
  const data2 = JSON.parse(readFileSync(filepath2));
  return findDiff(data1, data2);
};
