import Minimist from 'minimist';
import Mocha from 'mocha';
import Glob from 'glob';

// Stops all sorts of React warnings popping up in unit tests
process.env.NODE_ENV = 'production';

const argv = Minimist(process.argv.slice(2), {
  alias: {
    c: 'component',
    g: 'grep',
  },
});

const mocha = new Mocha({
  grep: argv.grep ? argv.grep : undefined,
});

Glob(`src/**/*${argv.component ? argv.component : ''}*.spec.js`, {}, (err, files) => {
  files.forEach((file) => mocha.addFile(file));

  mocha.run((failures) => {
    process.on('exit', () => {
      process.exit(failures);
    });
  });
});
