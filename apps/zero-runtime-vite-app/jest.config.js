// Mandatory to map so that the imports translate to cjs files
// eslint-disable-next-line import/no-unresolved
const { createTheme } = require('@mui/material/node/styles');

const theme = createTheme();
// @TODO - Make this part of the main package
// @ts-ignore
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    // @TODO - Use custom stylis plugin as in docs/src/createEmotionCache.ts
    // so that we don't need to use *
    '* :where([data-mui-color-scheme="dark"]) &': obj,
  };
};

/**
 * @type {import('jest').Config}
 */
module.exports = {
  transform: {
    '\\.[jt]sx?': ['@mui/zero-jest', { theme }],
  },
  // Mandatory to map so that the imports translate to cjs files
  moduleNameMapper: {
    '^@mui/material(.*)$': '@mui/material/node/$1',
  },
  verbose: true,
  testEnvironment: 'jsdom',
};
