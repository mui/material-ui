// @flow weak

process.env.NODE_ENV = 'test';

require('babel-register');
require('app-module-path').addPath(`${__dirname}'./../`);
require('./cli');
