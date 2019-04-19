const path = require('path');
const safeJsonStringify = require('safe-json-stringify');

const root = path.resolve(__dirname, '..');

module.exports = function exampleLoader(source) {
  const relativePath = path.relative(root, this.resource);

  const escapedRawSource = safeJsonStringify(source.replace(/'/g, '"'));
  const sourceWithExportedContext =
    source +
    `\nexport const raw = ${escapedRawSource}` +
    `\nexport const relativePath = "${relativePath}"`;

  return sourceWithExportedContext;
};
