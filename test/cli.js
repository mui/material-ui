// @flow weak

import program from 'commander';
import runE2ETests from './e2e';
import runRegressionsTests from './regressions';
import runKarmaTests from './karma';
import runMochaTests from './mocha';
import watchMochaTests from './mocha.watch';

program
  .version('0.1.0')
  .description('See help for specific commands using [command] --help');

program
  .command('mocha')
  .description('Run the core mocha unit/integration test suite.')
  .option('-w, --watch', 'Watch source and test files for changes')
  .option('-g, --grep <pattern>', 'Passed through to mocha')
  .option(
    '-m, --module <name>',
    'Require tests for a specific module, or comma separated modules',
    (value) => {
      if (value) {
        if (value.indexOf(',') !== -1) {
          return `+(${value.split(',').join('|')})`;
        }
        return value;
      }
      return '*';
    },
  )
  .action((command) => {
    const { module, grep, watch } = command;
    if (watch) {
      return watchMochaTests(
        process.argv.slice(3).reduce((args, n) => {
          if (n !== '-w' && n !== '--watch') {
            args.push(n);
          }
          return args;
        }, []),
      );
    }
    return runMochaTests({ module, grep });
  });

program
  .command('karma')
  .description('Run the mocha test suite using the karmer runner.')
  .option('-w, --watch', 'Watch source and test files for changes')
  .option('-g, --grep <pattern>', 'Passed through to mocha')
  .action((command) => {
    const { grep, watch } = command;
    return runKarmaTests({ grep, watch });
  });

program
  .command('e2e')
  .description('Run the e2e selenium tests')
  .option('-l, --local', 'Use nightwatch.local.conf.js')
  .option('-e, --environment', 'Comma separated string of browser test environment names')
  .action((command) => {
    const { local, browsers } = command;
    return runE2ETests({ local, browsers });
  });

program
  .command('regressions')
  .description('Run the visual regression tests')
  .option('-l, --local', 'Use nightwatch.local.conf.js')
  .option('-e, --environment', 'Comma separated string of browser test environment names')
  .option('-c, --create-baseline', 'Create the baseline images instead of running a test')
  .action((command) => {
    const { local, browsers, createBaseline } = command;
    return runRegressionsTests({ local, browsers, createBaseline });
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
