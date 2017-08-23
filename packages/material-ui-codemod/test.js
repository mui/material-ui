/* eslint-disable flowtype/require-valid-file-annotation */

import Minimist from 'minimist';
import Mocha from 'mocha';
import glob from 'glob';

const argv = Minimist(process.argv.slice(2), {
  alias: {
    c: 'component',
    g: 'grep',
  },
});

const mocha = new Mocha({
  grep: argv.grep ? argv.grep : undefined,
});

const paths = [];

if (!argv.component) {
  paths.push('modules/**/*.spec.js');
}

let pattern;

if (paths.length > 1) {
  pattern = `{${paths.join(',')}}`;
} else {
  pattern = paths[0];
}

glob(pattern, {}, (err, files) => {
  files.forEach(file => mocha.addFile(file));

  mocha.run(failures => {
    process.on('exit', () => {
      process.exit(failures);
    });
  });
});
