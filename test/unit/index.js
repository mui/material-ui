require('app-module-path').addPath(`${__dirname}'./../../`);
import Mocha from 'mocha';
import Glob from 'glob';

const mocha = new Mocha();

Glob(`${__dirname}/**/*.spec.js`, {}, (err, files) => {

  files.forEach((file) => mocha.addFile(file));

  mocha.run((failures) => {
    process.on('exit', () => {
      process.exit(failures);
    });
  });
});
