import * as babel from '@babel/core';
import * as t from '@babel/types';
import resolveImports, { MappedImportsType } from './resolveImports';

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
          case '@material-ui/core': {
            if (coreImports === undefined) {
              coreImports = resolveImports(require.resolve('@material-ui/core'));
            }
            handleImports(path, coreImports, `@material-ui/core`);
            return;
          }
          case '@material-ui/styles': {
            if (stylesImports === undefined) {
              stylesImports = resolveImports(require.resolve('@material-ui/styles'));
            }
            handleImports(path, stylesImports, `@material-ui/styles`);
            return;
          }
          case '@material-ui/lab': {
            if (labImports === undefined) {
              labImports = resolveImports(require.resolve('@material-ui/lab'));
            }
            handleImports(path, labImports, `@material-ui/lab`);
            return;
          }
          case '@material-ui/icons': {
            handleIcons(path, `@material-ui/icons`);
            return;
          }
        }
      },
    },
  };
};
