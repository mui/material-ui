var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  handleErrors = require('../util/handleErrors'),
  config = require('../config').less;

gulp.task('less', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});
