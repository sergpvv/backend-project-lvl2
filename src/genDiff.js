import { readFileSync } from 'fs';

export default (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1);
  const data2 = readFileSync(filepath2);
  return `${data1}\n${data2}`;
};
