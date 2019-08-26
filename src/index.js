const gendiff = require('commander');

gendiff
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
if (!gendiff.args.length) gendiff.help();
