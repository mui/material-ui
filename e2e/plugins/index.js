const wp = require('@cypress/webpack-preprocessor');
const percyHealthCheck = require('@percy/cypress/task');

module.exports = on => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.ts?$/,
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
    },
  };

  on('file:preprocessor', wp(options));
  on('task', percyHealthCheck);
};
