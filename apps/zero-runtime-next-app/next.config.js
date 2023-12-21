const { createTheme } = require('@mui/material/styles');
const withZero = require('@mui/zero-next-plugin').default;

const theme = createTheme({
  typography: {
    fontFamilyCode: 'Menlo,Consolas,"Droid Sans Mono",monospace',
  },
});
// @TODO - Make this part of the main package
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    ':where([data-mui-color-scheme="dark"]) &': obj,
  };
};

/** @type {import('@mui/zero-webpack-plugin').ZeroPluginOptions} */
const zeroPluginConfig = {
  theme,
  cssVariablesPrefix: 'app',
};

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withZero(nextConfig, zeroPluginConfig);
