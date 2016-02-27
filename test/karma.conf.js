
// Karma configuration
module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '../',
    browsers: ['PhantomJS'],
    colors: true,
    frameworks: ['mocha', 'chai-sinon'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      {
        pattern: 'test/tests.webpack.js',
        watched: false,
        served: true,
        included: true,
      },
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai-sinon',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter',
    ],
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage'],
    singleRun: false,
    webpack: {
      devtool: 'cheap-module-source-map',
      module: {
        preLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'isparta',
            exclude: /(node_modules|test|svg-icons)/,
          },
        ],
        loaders: [
          {
            test: /\.(js|jsx)$/,
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
          sinon: 'sinon/pkg/sinon.js',
        },
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: [
          'node_modules',
          'src',
        ],
      },
      externals: {
        'jsdom': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
      },
    },
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      dir: 'test/coverage/browser',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      includeAllSources: true,
      reporters: [
        {type: 'lcovonly', file: 'lcov.info'},
        {type: 'text', file: 'text.txt'},
        {type: 'json', file: 'coverage.json'},
        {type: 'text-summary'},
        {type: 'html'},
      ],
    },
  });
};
