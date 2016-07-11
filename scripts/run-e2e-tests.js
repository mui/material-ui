/* eslint-disable no-console */
const path = require('path');
const child_process = require('child_process');
const browserstack = require('browserstack-local');
const webpack = require('webpack');
const httpServer = require('http-server');

const compiler = webpack(require('../docs/site/webpack.prod.config.js'));


const server = httpServer.createServer({
  root: path.resolve(__dirname, '../docs/site'),
});
const bsLocal = new browserstack.Local();

// Kick it off
buildDocs();

function buildDocs() {
  console.log('Building webpack bundle');

  compiler.run(function(err) {
    if (err) {
      throw err;
    }
    bootServer();
  });
}

function bootServer() {
  console.log('Booting HTTP server');

  server.listen(8080, () => {
    console.log('Server listening on port 8080');

    child_process.exec('git rev-parse --short HEAD', function(err, stdout) {
      process.env.MUI_HASH = stdout;
      execTests();
    });
  });
}

function execTests() {
  const bsLocalArgs = {
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    forcelocal: true,
  };

  bsLocal.start(bsLocalArgs, function(err) {
    if (err) {
      throw err;
    } else {
      console.log('Connected. Now testing...');

      const child = child_process.spawn(
        './node_modules/.bin/nightwatch',
        [
          '-c',
          'test/nightwatch.conf.js',
          '-e',
          'chrome_51,safari_9,firefox_46,ie_edge,ie_11,ie_10',
        ],
        {
          stdio: [0, 0, 0],
        }
      );

      child.on('close', function() {
        console.log('closed!');
        process.exit(0);
      });

      child.on('error', function(err) {
        throw err;
      });
    }
  });
}

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('uncaughtException', cleanUp);

function cleanUp() {
  server.close(() => {
    console.log('Shut down server.');
  });
  bsLocal.stop(() => {
    console.log('Shut down bsLocal.');
  });
}
