var gulp = require('gulp');
var config = require('../config').svgs;

gulp.task('svgs', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
