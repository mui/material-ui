const path = require('path');
const loaderUtils = require('loader-utils');
const safeJsonStringify = require('safe-json-stringify');
const nextBabelLoader = require('next/dist/build/webpack/loaders/next-babel-loader');

const root = path.resolve(__dirname, '..');

module.exports = function exampleLoader(source) {
  const relativePath = path.relative(root, this.resource);

  const escapedRawSource = safeJsonStringify(source.replace(/'/g, '"'));
  const sourceWithExportedContext =
    source +
    `\nexport const raw = ${escapedRawSource}` +
    `\nexport const relativePath = "${relativePath}"`;

  nextBabelLoader.call(this, sourceWithExportedContext);
};
