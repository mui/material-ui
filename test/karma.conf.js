const path = require('path');
const argv = process.argv.slice(2);
const opts = {
  grep: undefined,
};

argv.forEach((arg) => {
  if (/^--grep=/.test(arg)) {
    opts.grep = arg.replace('--grep=', '').trim();
    opts.coverage = false; // disable if grepping
  }
});
const timestamp = new Date();

// Karma configuration
module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '../',
    browserNoActivityTimeout: 300000,
    browsers: ['PhantomJS_Sized', 'BrowserStack_Chrome', 'BrowserStack_Firefox',
      'BrowserStack_Safari', 'BrowserStack_IE'],
    client: {
      mocha: {
        grep: opts.grep,
      },
    },
    colors: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      {
        pattern: 'test/karma.tests.js',
        watched: false,
        served: true,
        included: true,
      },
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-browserstack-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
    ],
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/karma.tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: false,
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      build: `material-ui-build-${timestamp.toString()}`,
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
        ],
        noParse: [
          /node_modules\/sinon\//,
        ],
      },
      resolve: {
        alias: {
          'material-ui': path.resolve(__dirname, '../src'),
          sinon: 'sinon/pkg/sinon.js',
        },
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: [
          'node_modules',
          './',
        ],
      },
      externals: {
        'jsdom': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
        'react/addons': true, // For enzyme
      },
    },
    webpackServer: {
      noInfo: true,
    },
    customLaunchers: {
      'PhantomJS_Sized': {
        base: 'PhantomJS',
        options: {
          viewportSize: { // Matches JSDom size.
            width: 1024,
            height: 768,
          },
        },
      },
      'BrowserStack_Chrome': {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Sierra',
        browser: 'chrome',
        browser_version: 'latest',
      },
      'BrowserStack_Firefox': {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'firefox',
        browser_version: 'latest',
      },
      'BrowserStack_Safari': {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Yosemite',
        browser: 'safari',
        browser_version: 'latest',
      },
      'BrowserStack_IE': {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '7',
        browser: 'ie',
        browser_version: 'latest',
      },
    },
  });
};
