// @flow weak
const Mocha = require('mocha');
const glob = require('glob');
const createGlobalDOM = require('./utils/dom');

module.exports = runMochaTests;

function runMochaTests({ module = '*', grep, types = ['unit', 'integration'] }) {
  createGlobalDOM();

  const globPatterns = {
    unit: `src/**/${module}.spec.js`,
    integration: `test/integration/**/${module}.test.js`,
  };

  let pattern;

  if (types.indexOf('unit') + types.indexOf('integration') === -2) {
    pattern = Object.keys(globPatterns).map((n) => globPatterns[n]);
  } else {
    pattern = types.map((n) => globPatterns[n]);
  }

  const mocha = new Mocha({
    grep,
    reporter: 'dot',
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
}
