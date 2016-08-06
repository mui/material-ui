// @flow weak
const path = require('path');
const { Server } = require('karma');

module.exports = runKarmaTests;

function runKarmaTests({ grep, watch = false }) {
  const options = {
    configFile: path.resolve(__dirname, 'karma.conf.js'),
    autoWatch: watch,
    client: {
      mocha: { grep },
    },
    singleRun: !watch,
  };

  const server = new Server(options, (exitCode) => {
    process.exit(exitCode);
  });

  server.start();
}
