const path = require('path');
const webpack = require('webpack');

const workspaceRoot = path.resolve(__dirname, '../');

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
    browsers: ['chrome-headless'],
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
      {
        pattern: 'test/assets/*.png',
        watched: false,
        included: false,
        served: true,
      },
    ],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
      require.resolve('./utils/KarmaReporterReactProfiler'),
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
    proxies: {
      '/fake.png': '/base/test/assets/fake.png',
      '/fake2.png': '/base/test/assets/fake2.png',
    },
    reporters: ['dots', 'profiler'],
    reactProfilerReporter: {
      outputDir: path.join(workspaceRoot, 'tmp/react-profiler-report/karma'),
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
          'process.env.CI': JSON.stringify(process.env.CI),
          'process.env.KARMA': JSON.stringify(true),
          'process.env.TEST_GATE': JSON.stringify(process.env.TEST_GATE),
        }),
      ],
      module: {
        rules: [
          {
            test: /\.(js|ts|tsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              envName: 'stable',
            },
          },
        ],
      },
      node: {
        // Some tests import fs
        fs: 'empty',
      },
      resolve: {
        alias: {
          // yarn alias for `pretty-format@3`
          // @testing-library/dom -> pretty-format@25
          // which uses Object.entries which isn't implemented in all browsers
          // we support
          'pretty-format': require.resolve('pretty-format-v24'),
          // https://github.com/sinonjs/sinon/issues/1951
          // use the cdn main field. Neither module nor main are supported for browserbuilds
          sinon: 'sinon/pkg/sinon.js',
          // https://github.com/testing-library/react-testing-library/issues/486
          // "default" bundles are not browser compatible
          '@testing-library/react/pure':
            '@testing-library/react/dist/@testing-library/react.pure.esm',
        },
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
    webpackMiddleware: {
      noInfo: true,
      writeToDisk: Boolean(process.env.CI),
    },
    customLaunchers: {
      'chrome-headless': {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: Boolean(process.env.CI),
  };

  let newConfig = baseConfig;

  if (browserStack.accessKey) {
    newConfig = {
      ...baseConfig,
      browserStack,
      browsers: baseConfig.browsers.concat(['chrome', 'firefox', 'safari', 'edge']),
      plugins: baseConfig.plugins.concat(['karma-browserstack-launcher']),
      customLaunchers: {
        ...baseConfig.customLaunchers,
        chrome: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Catalina',
          browser: 'chrome',
          browser_version: '84.0',
        },
        firefox: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'firefox',
          browser_version: '78.0',
        },
        safari: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Catalina',
          browser: 'safari',
          // We support 12.2 on iOS.
          // However, 12.1 is very flaky on desktop (mobile is always flaky).
          browser_version: '13.0',
        },
        edge: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'edge',
          browser_version: '85.0',
        },
      },
    };
  }

  config.set(newConfig);
};
