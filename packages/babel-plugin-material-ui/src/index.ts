import * as babel from '@babel/core';
import * as t from '@babel/types';
import resolveImports, { MappedImportsType } from './resolveImports';

enum Packages {
  Core = '@material-ui/core',
  Styles = '@material-ui/styles',
  Lab = '@material-ui/lab',
  Icons = '@material-ui/icons',
}

/**
 * Holds the import name and location of everything found in the index file of each package
 */
const importMaps: { [K: string]: MappedImportsType | undefined } = {};

/**
 * Used to transform the specified root import to specific imports based on the exports found
 * in the index file of the package
 */
function transformImport(path: babel.NodePath<t.ImportDeclaration>, packageName: string) {
  if (importMaps[packageName] === undefined) {
    importMaps[packageName] = resolveImports(require.resolve(packageName));
  }

  const { node } = path;
  const importMap = importMaps[packageName]!;

  for (const key in importMap) {
    if (!importMap.hasOwnProperty(key)) {
      continue;
    }

    const elements = importMap[key];
    const newSpecifiers: Array<t.ImportDefaultSpecifier | t.ImportSpecifier> = [];

    node.specifiers = node.specifiers.filter(spec => {
      if (!t.isImportSpecifier(spec)) {
        return true;
      }

      const mappedImport = elements.find(x => x.name === spec.imported.name);
      if (!mappedImport) {
        return true;
      }

      newSpecifiers.push(
        mappedImport.default
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

    if (node.specifiers.length === 0) {
      break;
    }
  }

  if (node.specifiers.length === 0) {
    path.remove();
  }
}

/**
 * Used to perform a simple transform on the specified import where all imports is a
 * file/folder (@material-ui/icons)
 */
function simpleTransform(path: babel.NodePath<t.ImportDeclaration>, packageName: string) {
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
    name: '@material-ui/babel-plugin-material-ui',
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
