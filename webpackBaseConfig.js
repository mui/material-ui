const path = require('path');

// WARNING: Use this module only as an inspiration.
// Cherry-pick the parts you need and inline them in the webpack.config you need.
// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos and by eslint-plugin-import.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '@mui/material': path.resolve(__dirname, './packages/material-ui/src'),
      '@mui/docs': path.resolve(__dirname, './packages/material-ui-docs/src'),
      '@mui/icons-material': path.resolve(__dirname, './packages/material-ui-icons/lib'),
      '@mui/lab': path.resolve(__dirname, './packages/material-ui-lab/src'),
      '@mui/styled-engine': path.resolve(__dirname, './packages/material-ui-styled-engine/src'),
      '@mui/styled-engine-sc': path.resolve(
        __dirname,
        './packages/material-ui-styled-engine-sc/src',
      ),
      '@mui/styles': path.resolve(__dirname, './packages/material-ui-styles/src'),
      '@mui/system': path.resolve(__dirname, './packages/material-ui-system/src'),
      '@mui/private-theming': path.resolve(__dirname, './packages/material-ui-private-theming/src'),
      '@mui/core': path.resolve(__dirname, './packages/material-ui-unstyled/src'),
      '@mui/utils': path.resolve(__dirname, './packages/material-ui-utils/src'),
      'typescript-to-proptypes': path.resolve(__dirname, './packages/typescript-to-proptypes/src'),
      docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
};
