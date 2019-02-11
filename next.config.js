const webpack = require('webpack');
const pkg = require('./package.json');
const withTM = require('next-plugin-transpile-modules');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { findPages } = require('./docs/src/modules/utils/find');

process.env.LIB_VERSION = pkg.version;

module.exports = {
  webpack: (config, options) => {
    // Alias @material-ui/core peer dependency imports form the following modules to our sources.
    config = withTM({
      transpileModules: ['notistack', 'material-ui-pickers'],
    }).webpack(config, options);

    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          LIB_VERSION: JSON.stringify(process.env.LIB_VERSION),
        },
      }),
    ]);

    if (process.env.DOCS_STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          // Will be available at `.next/stats.json`
          statsFilename: 'stats.json',
        }),
      );
    }

    return Object.assign({}, config, {
      plugins,
      node: {
        fs: 'empty',
      },
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.(css|md)$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.(css|md)$/,
            loader: 'raw-loader',
          },
        ]),
      }),
    });
  },
  webpackDevMiddleware: config => config,
  // next.js also provide a `defaultPathMap` so we could simplify the logic.
  // However, we keep it in order to prevent any future regression on the `findPages()` side.
  exportPathMap: () => {
    const map = {};

    function generateMap(pages) {
      pages.forEach(page => {
        if (!page.children) {
          map[page.pathname] = {
            page: page.pathname,
          };
          return;
        }

        generateMap(page.children);
      });
    }

    generateMap(findPages());

    return map;
  },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },
};
