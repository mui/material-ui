const path = require('path');
const { chromium } = require('playwright');
const webpack = require('webpack');

const workspaceRoot = path.resolve(__dirname, '../');

const browserStack = {
  username: process.env.BROWSERSTACK_USERNAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  build: `mui-core-profile-${new Date().toISOString()}`,
};

process.env.CHROME_BIN = chromium.executablePath();

// Karma configuration
module.exports = function setKarmaConfig(config) {
  const baseConfig = {
    basePath: '../',
    browsers: ['chromeHeadless'],
    browserDisconnectTimeout: 120000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 300000, // default 10000
    colors: true,
    frameworks: ['mocha', 'webpack'],
    files: [
      {
        pattern: 'test/karma.tests.js',
        watched: false,
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
      '@mui/internal-test-utils/KarmaReporterReactProfiler',
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
      // TODO: profile in production
      mode: 'development',
      // https://webpack.js.org/configuration/devtool/#devtool
      devtool: 'eval-cheap-source-map',
      optimization: {
        // Helps debugging and build perf.
        // Bundle size is irrelevant for local serving.
        minimize: false,
        // TODO: profile in production
        nodeEnv: 'test',
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.CI': JSON.stringify(process.env.CI),
          'process.env.KARMA': JSON.stringify(true),
          'process.env.TEST_GATE': JSON.stringify('enable-dispatching-profiler'),
        }),
        new webpack.ProvidePlugin({
          // required by code accessing `process.env` in the browser
          process: 'process/browser.js',
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
      resolve: {
        alias: {
          // "How to use profiling in production"
          // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977#react-dom1660--scheduler0100
          'react-dom$': 'react-dom/profiling',
        },
        extensions: ['.js', '.ts', '.tsx'],
        fallback: {
          // needed by sourcemap
          fs: false,
          path: false,
          // Exclude polyfill and treat 'stream' as an empty module since it is not required. next -> gzip-size relies on it.
          stream: false,
        },
      },
      // TODO: 'browserslist:modern'
      // See https://github.com/webpack/webpack/issues/14203
      target: 'web',
    },
    webpackMiddleware: {
      noInfo: true,
      writeToDisk: Boolean(process.env.CI),
    },
    customLaunchers: {
      chromeHeadless: {
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
          // We support Chrome 109.x per .browserslistrc
          browser_version: '109.0',
        },
        // No accurate performance timings (integer precision instead of double).
        firefox: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'firefox',
          // We support Firefox 115.x per .browserslistrc
          browser_version: '115.0',
        },
        // No accurate performance timings (integer precision instead of double).
        safari: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Monterey',
          browser: 'safari',
          browser_version: '15.6',
        },
        edge: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'edge',
          browser_version: '120.0',
        },
      },
    };
  }

  config.set(newConfig);
};
