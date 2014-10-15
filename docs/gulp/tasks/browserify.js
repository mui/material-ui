/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var gulp         = require('gulp');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');


gulp.task('browserify', function() {

var bundler = watchify(browserify('./src/app/app.jsx', watchify.args));

  var bundle = function(ids) {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('app.js'))
      // Specify the output destination
      .pipe(gulp.dest('./build/'))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
