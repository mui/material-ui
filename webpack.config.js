const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'material-ui-pickers',
    libraryTarget: 'umd', // THIS IS THE MOST IMPORTANT LINE! :mindblow:
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              'transform-class-properties',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
};
