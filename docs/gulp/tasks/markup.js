var gulp = require('gulp');

gulp.task('markup', function() {
  return gulp.src('src/www/**')
    .pipe(gulp.dest('build'));
});
