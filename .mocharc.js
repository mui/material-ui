module.exports = {
  extension: ['js', 'mjs', 'ts', 'tsx'],
  ignore: [
    '**/build/**',
    '**/node_modules/**',
    // Mocha seems to ignore .next anyway (maybe because dotfiles?).
    // We're leaving this to make sure.
    'docs/.next/**',
  ],
  recursive: true,
  timeout: (process.env.CIRCLECI === 'true' ? 5 : 2) * 1000, // Circle CI has low-performance CPUs.
  reporter: 'dot',
  require: ['@mui/internal-test-utils/setupBabel', '@mui/internal-test-utils/setupJSDOM'],
  'watch-ignore': [
    // default
    '.git',
    // node_modules can be nested with workspaces
    '**/node_modules/**',
    // Unrelated directories with a large number of files
    '**/build/**',
    'docs/.next/**',
  ],
  // detect-modules doesn't work with @babel/register
  // https://github.com/babel/babel/issues/6737
  'node-option': ['no-experimental-detect-module'],
};
