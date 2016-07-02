/* eslint-disable no-console */
import Nodemon from 'nodemon';

Nodemon({
  args: process.argv,
  script: 'test/index.js',
  execMap: {js: 'node_modules/.bin/babel-node'},
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
