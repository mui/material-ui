// @flow weak
/* eslint-disable no-console */

import Nodemon from 'nodemon';

Nodemon({
  args: process.argv.slice(2),
  exec: 'npm run -s test --',
  ext: 'js',
  watch: ['src/', 'test/integration'],
});

Nodemon.on('start', () => {
  console.log('Test have started');
}).on('quit', () => {
  console.log('Test have quit');
  process.exit();
}).on('restart', (files) => {
  console.log('Test restarted due to: ', files);
});
