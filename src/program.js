import program from 'commander';

import genDiff, { outputFormats } from '.';

program
  .version('0.3.3', '-v, --version', 'Output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', `Specify output format: ${outputFormats.join(', ')}`, 'json')
  .action((first, second) => {
    if (outputFormats.includes(program.format)) {
      console.log(genDiff(first, second, program.format));
    } else {
      console.log('Unknown output format!');
    }
  })
  .parse(process.argv);
