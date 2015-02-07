var gulp = require('gulp');
var config = require('../config').fontIcons;

gulp.task('fontIcons', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
