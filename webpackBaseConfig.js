const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const extensions = ['.js', '.mjs', '.ts', '.tsx'];

// WARNING: Use this module only as an inspiration.
// Cherry-pick the parts you need and inline them in the webpack.config you need.
// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos and by eslint-plugin-import.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions,
    plugins: [new TsconfigPathsPlugin({ extensions })],
  },
};
