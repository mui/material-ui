var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp.src(['src/**'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});
gulp.task('pushtoDevApps',function(){
    return gulp.src('lib/**')
        .pipe(gulp.dest('/Users/muthaiahthiagarajan/Git/ccx/doctor-app/node_modules/material-ui/lib/'));
});