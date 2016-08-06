/* eslint-disable no-console,global-require,flowtype/require-valid-file-annotation */

const path = require('path');
const childProcess = require('child_process');
const ngrok = require('ngrok');
const webpack = require('webpack');
const httpServer = require('http-server');

module.exports = runE2ETests;

function runE2ETests({ local = false, browsers = 'chrome' }) {
  const compiler = webpack(require('../docs/site/webpack.prod.config'));

  const server = httpServer.createServer({
    root: path.resolve(__dirname, '../docs/site'),
  });

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
        initLocalTunnel(execTests);
      });
    });
  }

  function initLocalTunnel(cb) {
    ngrok.connect(8080, (err, url) => {
      if (err) {
        throw err;
      } else {
        process.env.SELENIUM_LAUNCH_URL = url;
        console.log(`Connected to ${url}. Now testing...`);
        cb();
      }
    });
  }

  function execTests() {
    const child = childProcess.spawn(
      './node_modules/.bin/nightwatch',
      [
        '-c',
        local ? 'test/nightwatch.local.conf.js' : 'test/nightwatch.conf.js',
        '-e',
        browsers,
      ],
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

  process.on('exit', cleanUp);
  process.on('SIGINT', cleanUp);
  process.on('uncaughtException', cleanUp);

  function cleanUp() {
    ngrok.disconnect();
    ngrok.kill();
    server.close(() => {
      console.log('Shut down server.');
    });
  }
}
