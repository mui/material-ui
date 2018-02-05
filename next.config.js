const webpack = require('webpack');
const pkg = require('./package.json');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { findPages } = require('./docs/src/modules/utils/find');

process.env.MATERIAL_UI_VERSION = pkg.version;

module.exports = {
  webpack: config => {
    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          MATERIAL_UI_VERSION: JSON.stringify(process.env.MATERIAL_UI_VERSION),
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
        })
      );
    }

    return Object.assign({}, config, {
      plugins,
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
  poweredByHeader: false,
  exportPathMap: () => {
    const pages = findPages();
    const map = {
      '/': { page: '/' },
    }

    pages.forEach(lvl0Page => {
      if (!lvl0Page.children) {
        return
      }

      lvl0Page.children.forEach(lvl1Page => {
        map[lvl1Page.pathname] = {
          page: lvl1Page.pathname,
        }
      })
    })

    return map;
  },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },
};
