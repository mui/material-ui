// @flow weak

require('app-module-path').addPath(`${__dirname}'./../`);
import minimist from 'minimist';
import Mocha from 'mocha';
import glob from 'glob';
import './utils/dom';

const argv = minimist(process.argv.slice(2), {
  alias: {
    m: 'module',
    g: 'grep',
  },
});

function parseModuleArg(value) {
  if (value) {
    if (value.indexOf(',') !== -1) {
      return `+(${value.split(',').join('|')})`;
    }
    return value;
  }
  return '*';
}

const types = argv._;
const globPatterns = {
  unit: `src/**/${parseModuleArg(argv.module)}.spec.js`,
  integration: `test/integration/**/${parseModuleArg(argv.module)}.test.js`,
};

let pattern;

if (types.indexOf('unit') + types.indexOf('integration') === -2) {
  pattern = Object.keys(globPatterns).map((n) => globPatterns[n]);
} else {
  pattern = types.map((n) => globPatterns[n]);
}

const mocha = new Mocha({
  grep: argv.grep ? argv.grep : undefined,
});

glob(
  pattern.length > 1 ? `{${pattern.join(',')}}` : pattern[0],
  {},
  (err, files) => {
    files.forEach((file) => mocha.addFile(file));
    mocha.run((failures) => {
      process.on('exit', () => {
        process.exit(failures);
      });
    });
  }
);
