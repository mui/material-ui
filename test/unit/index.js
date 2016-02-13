require('app-module-path').addPath(`${__dirname}'./../../`);
import Mocha from 'mocha';
import Glob from 'glob';

const argv = process.argv.slice(2);
const opts = {};

if (argv && argv.length > 0) {
  opts.grep = argv[0];
}

const mocha = new Mocha(opts);

Glob(`${__dirname}/**/*.spec.js`, {}, (err, files) => {

  files.forEach((file) => mocha.addFile(file));

  mocha.run((failures) => {
    process.on('exit', () => {
      process.exit(failures);
    });
  });
});
