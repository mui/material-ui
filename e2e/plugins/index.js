const wp = require('@cypress/webpack-preprocessor');
const percyHealthCheck = require('@percy/cypress/task');
const babelLibConfig = require('../../lib/babel.config.js');

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
      module: {
        rules: [
          // {
          //   test: /\.(ts|tsx)?$/,
          //   loader: 'ts-loader',
          //   options: { transpileOnly: true },
          // },
          {
            test: /\.(ts|tsx)?$/,
            loader: 'babel-loader',
            options: babelLibConfig,
          },
        ],
      },
    },
  };

  on('file:preprocessor', wp(options));
  on('task', percyHealthCheck);
  // require('cypress-react-unit-test/plugins/react-scripts')(on, config);

  return config;
};
