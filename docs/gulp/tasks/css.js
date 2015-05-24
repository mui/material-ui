var gulp = require('gulp');
var config = require('../config').css;

gulp.task('css', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
