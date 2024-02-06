/* eslint-env node */
// eslint-ignore-next-line import/no-unresolved
const { withZeroPlugin } = require('@mui/zero-next-plugin');
const { experimental_extendTheme: extendTheme } = require('@mui/material/styles');

const theme = extendTheme({
  cssVarPrefix: 'app',
  components: {
    MuiBadge: {
      defaultProps: {
        color: 'error',
      },
    },
  },
});
theme.getColorSchemeSelector = (targetColorScheme) =>
  `[data-mui-color-scheme="${targetColorScheme}"] &`;

/**
 * @typedef {import('@mui/zero-next-plugin').ZeroPluginConfig} ZeroPluginConfig
 */

/**
 * @type {ZeroPluginConfig}
 */
const zeroPluginOptions = {
  theme,
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
