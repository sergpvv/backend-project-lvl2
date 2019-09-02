import program from 'commander';

import getDiff from './parsers';

program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<file1> <file2>')
  .option('-f, --format [type]', 'Output format', 'JSON')
  .action((file1, file2) => {
    console.log(getDiff(file1, file2));
  })
  .parse(process.argv);
if (!program.args.length) { program.help(); }
