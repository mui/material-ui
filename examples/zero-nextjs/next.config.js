const { withZeroPlugin, extendTheme } = require('@mui/zero-next-plugin');

module.exports = withZeroPlugin({}, {
  theme: extendTheme({});
});
