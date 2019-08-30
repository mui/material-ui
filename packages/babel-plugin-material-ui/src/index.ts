import * as babel from '@babel/core';
import * as t from '@babel/types';
import resolveImports, { MappedImportsType } from './resolveImports';

enum Packages {
  Core = '@material-ui/core',
  Styles = '@material-ui/styles',
  Lab = '@material-ui/lab',
  Icons = '@material-ui/icons',
}

let coreImports: MappedImportsType;
let labImports: MappedImportsType;
let stylesImports: MappedImportsType;

function handleImports(
  path: babel.NodePath<t.ImportDeclaration>,
  importMap: MappedImportsType,
  rootPath: string,
) {
  const { node } = path;

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
      path.insertBefore(t.importDeclaration(newSpecifiers, t.stringLiteral(`${rootPath}/${key}`)));
    }

    if (node.specifiers.length === 0) {
      break;
    }
  }

  if (node.specifiers.length === 0) {
    path.remove();
  }
}

function handleIcons(path: babel.NodePath<t.ImportDeclaration>, rootPath: string) {
  const { node } = path;
  node.specifiers = node.specifiers.filter(spec => {
    if (!t.isImportSpecifier(spec)) {
      return true;
    }

    path.insertBefore(
      t.importDeclaration(
        [t.importDefaultSpecifier(spec.local)],
        t.stringLiteral(`${rootPath}/${spec.imported.name}`),
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
        switch (path.node.source.value) {
          case Packages.Core: {
            if (coreImports === undefined) {
              coreImports = resolveImports(require.resolve(Packages.Core));
            }
            handleImports(path, coreImports, Packages.Core);
            return;
          }
          case Packages.Styles: {
            if (stylesImports === undefined) {
              stylesImports = resolveImports(require.resolve(Packages.Styles));
            }
            handleImports(path, stylesImports, Packages.Styles);
            return;
          }
          case Packages.Lab: {
            if (labImports === undefined) {
              labImports = resolveImports(require.resolve(Packages.Lab));
            }
            handleImports(path, labImports, Packages.Lab);
            return;
          }
          case Packages.Icons: {
            handleIcons(path, Packages.Icons);
            return;
          }
        }
      },
    },
  };
};
