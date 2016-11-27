require('app-module-path').addPath(`${__dirname}'./../`);
import Minimist from 'minimist';
import Mocha from 'mocha';
import Glob from 'glob';
import './utils/dom';

const argv = Minimist(process.argv.slice(2), {
  alias: {
    c: 'component',
    g: 'grep',
  },
});

const types = argv._;
const globPatterns = {
  unit: `src/**/${argv.component ? argv.component : '*'}.spec.js`,
  integration: `test/integration/**/${argv.component ? argv.component : '*'}.spec.js`,
};

let pattern;

if (types.indexOf('unit') + types.indexOf('integration') === -2) {
  pattern = Object.keys(globPatterns).map((n) => globPatterns[n]);
} else {
  pattern = types.map((n) => globPatterns[n]);
}

const mocha = new Mocha({
  grep: argv.grep ? argv.grep : undefined,
  reporter: 'dot',
});

Glob(
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
