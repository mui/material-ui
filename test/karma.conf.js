const argv = process.argv.slice(2);
const opts = {
  coverage: true,
  grep: undefined,
};

argv.forEach((arg) => {
  if (/^--grep=/.test(arg)) {
    opts.grep = arg.replace('--grep=', '').trim();
    opts.coverage = false; // disable if grepping
  }
});

// Karma configuration
module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '../',
    browsers: ['PhantomJS'],
    client: {
      mocha: {
        grep: opts.grep,
      },
    },
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
      'karma-mocha-reporter',
    ].concat(opts.coverage ? ['karma-coverage'] : []),
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'].concat(opts.coverage ? ['coverage'] : []),
    singleRun: false,
    webpack: {
      devtool: 'cheap-module-source-map',
      module: {
        preLoaders: opts.coverage ? [
          {
            test: /\.js$/,
            loader: 'isparta',
            include: /src/,
            exclude: [
              /svg-icons/,
              /node_modules/,
            ],
          },
        ] : [],
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
    coverageReporter: opts.coverage ? {
      dir: 'test/coverage/browser',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      includeAllSources: true,
      reporters: [
        {type: 'lcovonly', file: 'lcov.info'},
        {type: 'json', file: 'coverage.json'},
        {type: 'text-summary'},
      ],
    } : {},
  });
};
