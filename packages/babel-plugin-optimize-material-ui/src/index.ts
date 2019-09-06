import { types as t, NodePath } from '@babel/core';
import resolveImports, { MappedImportsType, ImportType } from './resolveImports';
import { Packages } from './packages';

/**
 * Holds the import name and location of everything found in the index file of each package
 */
const importMaps: Record<string, MappedImportsType | undefined> = {};

/**
 * Used to transform the specified root import to specific imports based on the exports found
 * in the index file of the package
 */
function transformImport(path: NodePath<t.ImportDeclaration>, packageName: string) {
  if (importMaps[packageName] === undefined) {
    importMaps[packageName] = resolveImports(packageName);
  }

  const { node } = path;
  const importMap = importMaps[packageName]!;

  // Uses find to be able to break out of the loop
  Object.keys(importMap).find(key => {
    const elements = importMap[key];
    const newSpecifiers: Array<
      t.ImportDefaultSpecifier | t.ImportSpecifier | t.ImportNamespaceSpecifier
    > = [];

    node.specifiers = node.specifiers.filter(spec => {
      if (!t.isImportSpecifier(spec)) {
        return true;
      }

      const mappedImport = elements.find(x => x.name === spec.imported.name);
      if (!mappedImport) {
        return true;
      }

      newSpecifiers.push(
        mappedImport.type === ImportType.Namespace
          ? t.importNamespaceSpecifier(spec.local)
          : mappedImport.type === ImportType.Default
          ? t.importDefaultSpecifier(spec.local)
          : t.importSpecifier(spec.local, spec.imported),
      );
      return false;
    });

    if (newSpecifiers.length) {
      path.insertBefore(
        t.importDeclaration(newSpecifiers, t.stringLiteral(`${packageName}/${key}`)),
      );
    }

    return node.specifiers.length === 0;
  });

  if (node.specifiers.length === 0) {
    path.remove();
  }
}

/**
 * Used to perform a simple transform on the specified import where all imports is a
 * file/folder (@material-ui/icons)
 */
function simpleTransform(path: NodePath<t.ImportDeclaration>, packageName: string) {
  const { node } = path;
  node.specifiers = node.specifiers.filter(spec => {
    if (!t.isImportSpecifier(spec)) {
      return true;
    }

    path.insertBefore(
      t.importDeclaration(
        [t.importDefaultSpecifier(spec.local)],
        t.stringLiteral(`${packageName}/${spec.imported.name}`),
      ),
    );

    return false;
  });

  if (node.specifiers.length === 0) {
    path.remove();
  }
}

export default (): babel.PluginObj => {
  return {
    name: 'babel-plugin-optimize-material-ui',
    visitor: {
      ImportDeclaration(path) {
        const packageName = path.node.source.value;

        switch (path.node.source.value) {
          case Packages.Core:
          case Packages.Styles:
          case Packages.Lab: {
            transformImport(path, packageName);
            return;
          }
          case Packages.Icons: {
            simpleTransform(path, packageName);
            return;
          }
        }
      },
    },
  };
};
