var gulp = require('gulp');
var config = require('../config').muiFonts;

gulp.task('muiFonts', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
