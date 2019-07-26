const webpack = require('webpack');
const pkg = require('../package.json');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { findPages } = require('./src/modules/utils/find');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');

const LANGUAGES = ['en', 'zh', 'ru', 'pt', 'fr', 'es', 'de'];

const workspaceRoot = path.join(__dirname, '../');

module.exports = withTypescript({
  webpack: (config, options) => {
    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          LIB_VERSION: JSON.stringify(pkg.version),
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

    config.resolve.alias['react-dom$'] = 'react-dom/profiling';
    config.resolve.alias['scheduler/tracing'] = 'scheduler/tracing-profiling';

    // next includes node_modules in webpack externals. Some of those have dependencies
    // on the aliases defined above. If a module is an external those aliases won't be used.
    // We need tell webpack to not consider those packages as externals.
    if (options.isServer) {
      const [nextExternals, ...externals] = config.externals;

      if (externals.length > 0) {
        // currently not the case but other next plugins might introduce additional
        // rules for externals. We would need to handle those in the callback
        throw new Error('There are other externals in the webpack config.');
      }

      config.externals = [
        (context, request, callback) => {
          const hasDependencyOnRepoPackages = [
            'notistack',
            'material-table',
            '@material-ui/pickers',
          ].includes(request);

          if (hasDependencyOnRepoPackages) {
            return callback(null);
          }
          return nextExternals(context, request, callback);
        },
      ];
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
          // transpile 3rd party packages with dependencies in this repository
          {
            test: /\.(js|mjs|jsx)$/,
            include: /node_modules\/(material-table|notistack|@material-ui\/pickers)/,
            use: {
              loader: 'babel-loader',
              options: {
                // on the server we use the transpiled commonJS build, on client ES6 modules
                // babel needs to figure out in what context to parse the file
                sourceType: 'unambiguous',
                plugins: [
                  [
                    'babel-plugin-module-resolver',
                    {
                      alias: {
                        '@material-ui/core': '../packages/material-ui/src',
                      },
                      transformFunctions: ['require'],
                    },
                  ],
                ],
              },
            },
          },
          // required to transpile ../packages/
          {
            test: /\.(js|mjs|jsx)$/,
            include: [workspaceRoot],
            exclude: /node_modules/,
            use: options.defaultLoaders.babel,
          },
        ]),
      }),
    });
  },
  exportTrailingSlash: true,
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

      pages2.forEach(page => {
        if (!page.children) {
          map[`${prefix}${page.pathname}`] = {
            page: page.pathname,
            query: {
              userLanguage,
            },
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    // We want to speed-up the build of pull requests.
    if (process.env.PULL_REQUEST === 'true') {
      traverse(pages, 'en');
    } else {
      LANGUAGES.forEach(userLanguage => {
        traverse(pages, userLanguage);
      });
    }

    return map;
  },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },
});
