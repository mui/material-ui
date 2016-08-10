// @flow weak
/* eslint-disable no-console */
const nodemon = require('nodemon');

module.exports = watchMochaTests;

function watchMochaTests(args = []) {
  nodemon({
    args,
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
