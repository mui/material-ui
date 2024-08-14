// @ts-check
/// <reference path="./resolve.d.ts" />

const nodePath = require('path');
const resolve = require('resolve/sync');

/**
 * @typedef {import('@babel/core')} babel
 */

/**
 * @param {string} absolutePath
 * @param {string} relativeTo
 * @returns {string}
 */
function toRelativeImportSpecifier(absolutePath, relativeTo) {
  const relative = nodePath.posix.relative(relativeTo, absolutePath);
  return relative.startsWith('.') ? relative : `./${relative}`;
}

/**
 * @typedef {{ outExtension?: string }} Options
 */

/**
 * @param {babel} file
 * @param {Options} options
 * @returns {babel.PluginObj}
 */
module.exports = function plugin({ types: t }, { outExtension = '.js' }) {
  /** @type {Map<string, string>} */
  const cache = new Map();
  return {
    visitor: {
      ImportOrExportDeclaration(path, state) {
        if (path.isExportDefaultDeclaration()) {
          return;
        }

        if (
          (path.isExportDeclaration() && path.node.exportKind === 'type') ||
          (path.isImportDeclaration() && path.node.importKind === 'type')
        ) {
          return;
        }

        const source =
          /** @type {babel.NodePath<babel.types.StringLiteral | null | undefined> } */ (
            path.get('source')
          );

        if (!source.node) {
          return;
        }

        const importedPath = source.node.value;

        if (!importedPath.startsWith('.')) {
          // Only handle relative imports
          return;
        }
        if (nodePath.extname(importedPath)) {
          // Assume paths with extension are already resolved
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
            nodePath.basename(resolvedPath, nodePath.extname(resolvedPath)) + outExtension,
          );
          // get relative path (posix style, because will be used as an import)
          resolvedPath = toRelativeImportSpecifier(resolvedPath, dir);
          cache.set(absoluteImportPath, resolvedPath);
        }

        source.replaceWith(t.stringLiteral(resolvedPath));
      },
    },
  };
};
