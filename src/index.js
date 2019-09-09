import program from 'commander';

import genDiff from './genDiff';

import { outputFormats } from './utils';

program
  .version('0.2.2', '-v, --version', 'Output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Specify output format: "basic", "plain" or "json"', 'json')
  .action((first, second) => {
    program.first = first;
    program.second = second;
  })
  .parse(process.argv);

export default () => {
  if (!program.args.length) {
    program.help();
  } else if (outputFormats.includes(program.format)) {
    console.log(genDiff(program.first, program.second, program.format));
  } else {
    console.log('Unknown output format!');
  }
};
