const path = require('path');
const prettier = require('prettier');
const ignoredDemos = require('./ts-demo-ignore.json');

/**
 * babel config to transpile tsx demos to js
 *
 * Can be used to spot differences between ts and js demos which might indicate that they
 * do different things at runtime.
 *
 * Demos listed in ts-demo-ignore are not transpiled. Their path should be relative
 * to `${workspaceRoot}/docs/src/pages/demos`.
 */

const workspaceRoot = path.join(__dirname, '../');
const prettierConfig = prettier.resolveConfig.sync(workspaceRoot);
if (prettierConfig == null) {
  throw new Error('Could not find prettier config file from workspace root.');
}

const ignore = ignoredDemos.map(demoPath =>
  path.join(workspaceRoot, 'docs/src/pages/demos', `${demoPath}.tsx`),
);

module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: ['generator-prettier', 'unwrap-createStyles'],
  generatorOpts: prettierConfig,
  ignore,
};
