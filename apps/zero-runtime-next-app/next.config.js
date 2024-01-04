/* eslint-env node */
// eslint-ignore-next-line import/no-unresolved
const { withZeroPlugin } = require('@mui/zero-next-plugin');
const { experimental_extendTheme: extendTheme } = require('@mui/material/styles');

const theme = extendTheme();

theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    ':where([data-mui-color-scheme="dark"]) &': obj,
  };
};

/**
 * @typedef {import('@mui/zero-next-plugin').ZeroPluginConfig} ZeroPluginConfig
 */

/**
 * @type {ZeroPluginConfig}
 */
const zeroPluginOptions = {
  theme,
  cssVariablesPrefix: 'app',
  transformLibraries: ['local-ui-lib'],
  sourceMap: true,
  displayName: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withZeroPlugin(nextConfig, zeroPluginOptions);
