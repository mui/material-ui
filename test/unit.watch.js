/* eslint-disable no-console */
import Nodemon from 'nodemon';

Nodemon({
  args: process.argv,
  script: 'test/unit.js',
  execMap: {js: 'node_modules/.bin/babel-node'},
  ext: 'js',
  watch: 'src/',
});

Nodemon.on('start', () => {
  console.log('Unit tests have started');
}).on('quit', () => {
  console.log('Unit tests have quit');
}).on('restart', (files) => {
  console.log('Unit tests restarted due to: ', files);
});
