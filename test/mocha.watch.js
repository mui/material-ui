// @flow weak
/* eslint-disable no-console */
const nodemon = require('nodemon');

function watchMochaTests(args = []) {
  nodemon({
    args: args.concat(['||', 'true']),
    exec: 'node test mocha',
    ext: 'js',
    watch: ['src/', 'test/integration'],
  });

  nodemon.on('start', () => {
    console.log('Test have started');
  }).on('quit', () => {
    console.log('Test have quit');
    process.exit();
  }).on('restart', (files) => {
    console.log('Test restarted due to: ', files);
  });
}

module.exports = watchMochaTests;
