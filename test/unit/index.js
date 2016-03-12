require('app-module-path').addPath(`${__dirname}'./../../`);
import Mocha from 'mocha';
import Glob from 'glob';

const argv = process.argv.slice(2);
const opts = {};

if (argv && argv.length > 0) {
  let grep = argv[0];
  if (/^--grep=/.test(grep)) {
    grep = grep.replace('--grep=', '');
  }
  opts.grep = grep.trim();
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
