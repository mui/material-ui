var gulp = require('gulp');
var shell = require('gulp-shell');
var handleErrors = require('../util/handleErrors');

gulp.task('eslint', shell.task([
  '../node_modules/.bin/eslint ../src/**'
])).on('error', handleErrors);
