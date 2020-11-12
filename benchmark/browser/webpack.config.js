const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');

module.exports = {
  context: workspaceRoot,
  entry: 'benchmark/browser/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true, cwd: workspaceRoot },
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@material-ui/core': path.join(workspaceRoot, './packages/material-ui/src'),
      '@material-ui/styles': path.join(workspaceRoot, './packages/material-ui-styles/src'),
      '@material-ui/system': path.join(workspaceRoot, './packages/material-ui-system/src'),
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
};
