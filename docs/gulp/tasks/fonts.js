var gulp = require('gulp');

gulp.task('fonts', function() {
  return gulp.src('./dist/less/material-ui-icons/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});
