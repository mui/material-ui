const path = require('path');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');
const rehypePrism = require('@mapbox/rehype-prism');
const headings = require('./utils/anchor-autolink');
const tableStyler = require('./utils/table-styler');
const withTM = require('next-transpile-modules');
const slug = require('remark-slug');
const webpack = require('webpack');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    hastPlugins: [rehypePrism],
    mdPlugins: [slug, headings, tableStyler],
  },
});

module.exports = withBundleAnalyzer(
  withCSS(
    withImages(
      withTypescript(
        withMDX(
          withTM({
            webpack: config => {
              if (config.optimization.splitChunks.cacheGroups) {
                // split all date libs to separate chunk
                config.optimization.splitChunks.cacheGroups.dateLibs = {
                  name: 'commons',
                  chunks: 'all',
                  test: /(luxon|moment|date-fns|dayjs)/,
                };
                // move all pickers code to not duplicate it in each chunk
                config.optimization.splitChunks.cacheGroups.pickers = {
                  name: 'pickers',
                  chunks: 'all',
                  test: /[\\\/]node_modules[\\\/]@material-ui\/pickers[\\\/]/,
                };
              }

              // Process examples to inject raw code strings
              config.module.rules.push({
                test: /\.example\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'pages')],
                use: [
                  { loader: 'next-babel-loader' },
                  {
                    loader: path.resolve(__dirname, 'loaders', 'example-loader.js'),
                  },
                ],
              });

              // Resolve roots also for mdx pages
              config.resolve.modules.push(__dirname);
              config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

              return config;
            },
            target: process.env.IS_NOW ? 'serverless' : 'server',
            pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
            transpileModules: ['@material-ui/pickers'],
            analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
            analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
            bundleAnalyzerConfig: {
              server: {
                analyzerMode: 'static',
                reportFilename: '../../.next/bundle/server.html',
              },
              browser: {
                analyzerMode: 'static',
                reportFilename: '../.next/bundle/client.html',
              },
            },
          })
        )
      )
    )
  )
);
