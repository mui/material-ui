const nodePath = require('path');
const resolve = require('resolve/sync');

/**
 * @typedef {import('@babel/core')} babel
 */

/**
 * @typedef {{ extension?: string }} Options
 */

/**
 * @param {babel} file
 * @param {Options} options
 * @returns {babel.PluginObj}
 */
module.exports = function plugin({ types: t }, { extension = '.js' }) {
  /** @type {Map<string, string>} */
  const cache = new Map();
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const source = path.get('source');
        const importedPath = source.node.value;

        if (!importedPath.startsWith('.')) {
          return;
        }
        if (!state.filename) {
          throw new Error('filename is not defined');
        }
        const dir = nodePath.dirname(state.filename);
        // start from fully resolved import path
        const absoluteImportPath = nodePath.resolve(dir, importedPath);

        let resolvedPath = cache.get(absoluteImportPath);

        if (!resolvedPath) {
          // resolve to actual file
          resolvedPath = resolve(absoluteImportPath, {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          });
          // replace extension
          resolvedPath = nodePath.resolve(
            nodePath.dirname(resolvedPath),
            nodePath.basename(resolvedPath, nodePath.extname(resolvedPath)) + extension,
          );
          // get relative path (posix style, because will be used as an import)
          resolvedPath = nodePath.posix.relative(dir, resolvedPath);
          cache.set(absoluteImportPath, resolvedPath);
        }

        source.replaceWith(t.stringLiteral(resolvedPath));
      },
    },
  };
};
