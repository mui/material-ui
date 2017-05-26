// @flow weak
const path = require('path');
const webpack = require('webpack');

const libraryName = 'material-ui';

const baseConfig = {
  entry: {
    'material-ui': path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    'react-transition-group/TransitionGroup',
    {
      react: {
        root: 'React',
        commonjs2: './react',
        commonjs: ['./react'],
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: './react-dom',
        commonjs: ['./react-dom'],
        amd: 'react-dom',
      },
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [],
};

let config;

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      filename: `${libraryName}.min.js`,
    }),
    plugins: baseConfig.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ]),
  });
} else {
  config = Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      filename: `${libraryName}.js`,
    }),
  });
}

module.exports = config;
