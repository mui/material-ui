var gulp = require('gulp'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});
