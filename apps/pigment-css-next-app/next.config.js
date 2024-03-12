/* eslint-env node */
// eslint-ignore-next-line import/no-unresolved
const { withPigment } = require('@pigment-css/nextjs-plugin');
const { experimental_extendTheme: extendTheme } = require('@mui/material/styles');

/**
 * @typedef {import('@pigment-css/nextjs-plugin').PigmentOptions} PigmentOptions
 */

const theme = extendTheme({
  'max-width': '1100px',
  'border-radius': '12px',
  'font-mono': `ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace`,
  colorSchemes: {
    light: {
      'foreground-rgb': '0, 0, 0',
      'background-start-rgb': '214, 219, 220',
      'background-end-rgb': '255, 255, 255',
      'primary-glow': `conic-gradient(
        from 180deg at 50% 50%,
        #16abff33 0deg,
        #0885ff33 55deg,
        #54d6ff33 120deg,
        #0071ff33 160deg,
        transparent 360deg
      )`,
      'secondary-glow': `radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))`,
      title: {
        'start-rbg': '239, 245, 249',
        'end-rgb': '228, 232, 233',
        border: `conic-gradient(
          #00000080,
          #00000040,
          #00000030,
          #00000020,
          #00000010,
          #00000010,
          #00000080
        )`,
      },
      callout: {
        rgb: '238, 240, 241',
        'border-rgb': '172, 175, 176',
      },
      card: {
        rgb: '180, 185, 188',
        'border-rgb': '131, 134, 135',
      },
    },
    dark: {
      'foreground-rgb': '255, 255, 255',
      'background-start-rgb': '0, 0, 0',
      'background-end-rgb': '0, 0, 0',
      'primary-glow': `radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0))`,
      'secondary-glow': `linear-gradient(
        to bottom right,
        rgba(1, 65, 255, 0),
        rgba(1, 65, 255, 0),
        rgba(1, 65, 255, 0.3)
      )`,
      title: {
        'start-rbg': '2, 13, 46',
        'end-rgb': '2, 5, 19',
        border: `conic-gradient(
          #ffffff80,
          #ffffff40,
          #ffffff30,
          #ffffff20,
          #ffffff10,
          #ffffff10,
          #ffffff80
        )`,
      },
      callout: {
        rgb: '20, 20, 20',
        'border-rgb': '108, 108, 108',
      },
      card: {
        rgb: '100, 100, 100',
        'border-rgb': '200, 200, 200',
      },
    },
  },
});

// TODO: Fix this from the Material UI side in a separate PR
theme.palette = theme.colorSchemes.light.palette;
theme.getColorSchemeSelector = (colorScheme) => {
  return `@media (prefers-color-scheme: ${colorScheme})`;
};
const { css: rootCss } = theme.generateCssVars();
const { css: lightCss } = theme.generateCssVars('light');
const { css: darkCss } = theme.generateCssVars('dark');
theme.generateCssVars = (colorScheme) => {
  if (colorScheme === 'dark') {
    return {
      css: darkCss,
      selector: {
        '@media (prefers-color-scheme: dark)': {
          ':root': darkCss,
        },
      },
    };
  }
  if (colorScheme === 'light') {
    return { css: lightCss, selector: ':root' };
  }
  return { css: rootCss, selector: ':root' };
};

/**
 * @type {PigmentOptions}
 */
const pigmentOptions = {
  theme,
  transformLibraries: ['local-ui-lib'],
  sourceMap: true,
  displayName: true,
  transformSx: false,
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

module.exports = withPigment(nextConfig, pigmentOptions);
