const path = require('path');
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
const ignore = ignoredDemos.map(demoPath =>
  path.join(workspaceRoot, 'docs/src/pages/demos', `${demoPath}.tsx`),
);

module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: ['unwrap-createStyles'],
  ignore,
  generatorOpts: { retainLines: true },
};
