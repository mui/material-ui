/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */

const path = require('path');
const childProcess = require('child_process');
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

  compiler.run((err) => {
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

    childProcess.exec('git rev-parse --short HEAD', (err, stdout) => {
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

  bsLocal.start(bsLocalArgs, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected. Now testing...');

      const other = process.argv.slice(2);

      const child = childProcess.spawn(
        './node_modules/.bin/nightwatch',
      [
        '-c',
        'test/nightwatch.conf.js',
        '-e',
        'chrome_51,safari_9,firefox_46,ie_edge,ie_11,ie_10',
      ].concat(other),
        {
          stdio: [0, 0, 0],
        }
      );

      child.on('close', () => {
        console.log('closed!');
        process.exit(0);
      });

      child.on('error', (childErr) => {
        throw childErr;
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
