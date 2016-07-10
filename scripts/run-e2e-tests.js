/* eslint-disable no-console */
const child_process = require('child_process');
const browserstack = require('browserstack-local');

const bsLocal = new browserstack.Local();
const bsLocalArgs = {
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  forcelocal: true,
};

bsLocal.start(bsLocalArgs, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected. Now testing...');
    const child = child_process.execSync(
      './node_modules/.bin/nightwatch -c test/nightwatch.conf.js -e chrome_51,safari_9,firefox_46',
      {stdio: [0, 0, 0]}
    );

    if (child) {
      child.on('exit', function() {
        if (bsLocal) {
          bsLocal.stop(function() {});
        }
        process.exit(0);
      });
      child.on('error', function(err) {
        if (bsLocal) {
          bsLocal.stop(function() {});
        }
        throw err;
      });
    }
  }
  if (bsLocal) {
    bsLocal.stop(function() {});
  }
});
