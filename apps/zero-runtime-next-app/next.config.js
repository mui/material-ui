const { createTheme } = require('@mui/material/styles');
const withZero = require('@mui/zero-next-plugin').default;

const theme = createTheme({
  typography: {
    fontFamilyCode: 'Menlo,Consolas,"Droid Sans Mono",monospace',
  },
});
// @TODO - Make this part of the main package
// @ts-ignore
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    // @TODO - Use custom stylis plugin as in docs/src/createEmotionCache.ts
    // so that we don't need to use *
    '* :where([data-mui-color-scheme="dark"]) &': obj,
  };
};

/** @type {import('@mui/zero-webpack-plugin').ZeroPluginOptions} */
const zeroPluginConfig = {
  theme,
  cssVariablesPrefix: 'app',
  displayName: true,
  // sourceMap: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // linaria: zeroPluginConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withZero(nextConfig, zeroPluginConfig);
