var gulp = require('gulp');
var shell = require('gulp-shell');
var handleErrors = require('../util/handleErrors');

gulp.task('jshint', shell.task([
  '../node_modules/.bin/jsxhint --harmony ../src/* ../src/**/* ../src/**/**/* ./src/app/* ./src/app/**/* ./src/app/**/**/* ./src/app/**/**/**/* --exclude ../src/utils/modernizr.custom.js'
])).on('error', handleErrors);
