const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const workspaceRoot = path.join(__dirname, '..', '..');

module.exports = async function webpackConfig() {
  const config = {
    // ideally this would be computed from the bundles peer dependencies
    externals: /^(react|react-dom|react\/jsx-runtime)$/,
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }),
      ],
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'build'),
    },
    plugins: [new CompressionPlugin()],
    resolve: {
      alias: {
        '@material-ui/core': path.join(workspaceRoot, 'packages/material-ui/build'),
        '@material-ui/lab': path.join(workspaceRoot, 'packages/material-ui-lab/build'),
        '@material-ui/styled-engine': path.join(
          workspaceRoot,
          'packages/material-ui-styled-engine/build',
        ),
        '@material-ui/styled-engine-sc': path.join(
          workspaceRoot,
          'packages/material-ui-styles-sc/build',
        ),
        '@material-ui/styles': path.join(workspaceRoot, 'packages/material-ui-styles/build'),
        '@material-ui/system': path.join(workspaceRoot, 'packages/material-ui-system/build'),
        '@material-ui/utils': path.join(workspaceRoot, 'packages/material-ui-utils/build'),
      },
    },
  };

  return config;
};
