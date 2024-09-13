const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs/promises');
const webpackBaseConfig = require('../../webpackBaseConfig');

const docsStaticFolder = path.resolve(__dirname, '../../docs/public/static');

class CreateStaticFolderSymlinkPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.done.tapAsync(
      {
        name: 'CreateStaticFolderSymlinkPlugin',
        context: true,
      },
      async (context, compilation, callback) => {
        const outputPath = compiler.options.output.path;
        const staticFolder = `${outputPath}/static`;
        const target = path.relative(outputPath, docsStaticFolder);
        // eslint-disable-next-line no-console
        console.log(`Creating symlink to static folder at ${staticFolder}`);
        await fs.rm(`${outputPath}/static`, { force: true, recursive: true });
        await fs.symlink(target, staticFolder, 'dir');
        callback();
      },
    );
  }
}

module.exports = {
  ...webpackBaseConfig,
  entry: path.resolve(__dirname, 'index.js'),
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    // Helps debugging and build perf.
    // Bundle size is irrelevant for local serving
    minimize: false,
    concatenateModules: false,
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'tests.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template.html'),
    }),
    // Avoid bundling the whole @mui/icons-material package. x2 the bundling speed.
    new webpack.IgnorePlugin({ resourceRegExp: /material-icons\/SearchIcons\.js/ }),
    new webpack.ProvidePlugin({
      // required by code accessing `process.env` in the browser
      process: 'process/browser.js',
    }),
    new CreateStaticFolderSymlinkPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        // prism.js blocks @mui/internal-markdown/prism from being interpreted as ESM in this build.
        exclude: /node_modules|prism\.js/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.resolve(__dirname, '../../babel.config.js'),
          envName: 'regressions',
        },
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
      {
        test: /\.(jpg|gif|png)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    ...webpackBaseConfig.resolve,
    fallback: {
      // Exclude polyfill and treat 'fs' as an empty module since it is not required. next -> gzip-size relies on it.
      fs: false,
      // Exclude polyfill and treat 'stream' as an empty module since it is not required. next -> gzip-size relies on it.
      stream: false,
      // Exclude polyfill and treat 'zlib' as an empty module since it is not required. next -> gzip-size relies on it.
      zlib: false,
    },
  },
  // TODO: 'browserslist:modern'
  // See https://github.com/webpack/webpack/issues/14203
  target: 'web',
};
