const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const workspaceRoot = path.join(__dirname, '..', '..');

module.exports = async function webpackConfig() {
  const config = {
    cache: {
      type: 'memory',
    },
    // ideally this would be computed from the bundles peer dependencies
    externals: /^(react|react-dom|react\/jsx-runtime)$/,
    mode: 'production',
    optimization: {
      // Otherwise bundles with that include chunks for which we track the size separately are penalized
      // e.g. without this option `@material-ui/core.legacy` would be smaller since it could concatenate all modules
      // while `@material-ui/core` had to import the chunks from all the components.
      // Ideally we could just disable shared chunks but I couldn't figure out how.
      concatenateModules: false,
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
