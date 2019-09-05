import program from 'commander';

import genAst, { parse } from './parsers';

import jsonFormatter, { plainFormatter } from './formatters';

const formats = new Set(['json', 'plain']);

const formatter = {
  json: jsonFormatter,
  plain: plainFormatter,
};

export const genDiff = (filepath1, filepath2, format) => {
  const before = parse(filepath1);
  const after = parse(filepath2);
  const diff = genAst(before, after);
  return formatter[format](diff, before, after);
};

program
  .version('0.0.1', '-v, --version', 'Output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<file1> <file2>')
  .option('-f, --format [type]', 'Specify output format', 'json')
  .action((file1, file2) => {
    program.file1 = file1;
    program.file2 = file2;
  })
  .parse(process.argv);

export default () => {
  if (!program.args.length) {
    program.help();
  } else if (formats.has(program.format)) {
    console.log(genDiff(program.file1, program.file2, program.format));
  } else {
    console.log('unknown output format');
  }
};
