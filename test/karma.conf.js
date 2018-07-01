// @flow weak

const webpack = require('webpack');

const browserStack = {
  username: process.env.BROWSERSTACK_USERNAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  build: `material-ui-${new Date().toISOString()}`,
};

process.env.CHROME_BIN = require('puppeteer').executablePath();

// Karma configuration
module.exports = function setKarmaConfig(config) {
  const baseConfig = {
    basePath: '../',
    browsers: ['ChromeHeadless'],
    browserDisconnectTimeout: 120000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 300000, // default 10000
    colors: true,
    frameworks: ['mocha'],
    files: [
      {
        pattern: 'test/karma.tests.js',
        watched: true,
        served: true,
        included: true,
      },
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
    ],
    /**
     * possible values:
     * - config.LOG_DISABLE
     * - config.LOG_ERROR
     * - config.LOG_WARN
     * - config.LOG_INFO
     * - config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/karma.tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('test'),
          },
        }),
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
      },
      node: {
        // Some tests import fs
        fs: 'empty',
      },
    },
    webpackServer: {
      noInfo: true,
    },
    customLaunchers: {},
  };

  let newConfig = baseConfig;

  if (browserStack.accessKey) {
    newConfig = Object.assign({}, baseConfig, {
      browserStack,
      browsers: baseConfig.browsers.concat([
        'BrowserStack_Chrome',
        'BrowserStack_Firefox',
        'BrowserStack_Safari',
        'BrowserStack_Edge',
      ]),
      plugins: baseConfig.plugins.concat(['karma-browserstack-launcher']),
      customLaunchers: Object.assign({}, baseConfig.customLaunchers, {
        BrowserStack_Chrome: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Sierra',
          browser: 'Chrome',
          browser_version: '49.0',
        },
        BrowserStack_Firefox: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'Firefox',
          browser_version: '45.0',
        },
        BrowserStack_Safari: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Sierra',
          browser: 'Safari',
          browser_version: '10.1',
        },
        BrowserStack_Edge: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'Edge',
          browser_version: '14.0',
        },
      }),
    });
  }

  config.set(newConfig);
};
