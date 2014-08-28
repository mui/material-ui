var gulp = require('gulp');

gulp.task('fonts', function() {
  return gulp.src('src/material-ui/less/material-ui-icons/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});