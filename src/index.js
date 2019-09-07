import program from 'commander';

import genDiff from './genDiff';

import { outputFormats } from './utils';

program
  .version('0.2.0', '-v, --version', 'Output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Specify output format', 'json')
  .action((file1, file2) => {
    program.file1 = file1;
    program.file2 = file2;
  })
  .parse(process.argv);

export default () => {
  if (!program.args.length) {
    program.help();
  } else if (outputFormats.includes(program.format)) {
    console.log(genDiff(program.file1, program.file2, program.format));
  } else {
    console.log('Unknown output format!');
  }
};
