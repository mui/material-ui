const { withZeroPlugin } = require('@mui/zero-next-plugin');
const { extendTheme } = require('@mui/zero-runtime');

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: '0 0% 100%',
        foreground: '240 10% 3.9%',
        primary: '240 5.9% 10%',
        border: '240 5.9% 90%',
      },
    },
    dark: {
      palette: {
        background: '240 10% 3.9%',
        foreground: '0 0% 80%',
        primary: '0 0% 98%',
        border: '240 3.7% 15.9%',
      },
    },
  },
  getSelector: (colorScheme) => (colorScheme ? `.theme-${colorScheme}` : ':root'),
});

module.exports = withZeroPlugin({}, { theme });
