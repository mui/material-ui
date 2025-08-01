import addImports from 'jscodeshift-add-imports';

// istanbul ignore next
if (process.env.NODE_ENV === 'test') {
  const resolve = require.resolve;
  require.resolve = (source) =>
    resolve(source.replace(/^@mui\/material\/modern/, '../../../mui-material/src'));
}

export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  const importModule = options.importModule || '@mui/material';
  const targetModule = options.targetModule || '@mui/material';

  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const root = j(fileInfo.source);
  const importRegExp = new RegExp(`^${importModule}$`);
  const classesRegExp = /Classes$/;

  const importsToAdd = {};

  root.find(j.ImportDeclaration).forEach((path) => {
    if (!path.node.specifiers.length) {
      return;
    }

    if (path.value.importKind && path.value.importKind !== 'value') {
      return;
    }

    const importPath = path.value.source.value;
    const match = importPath.match(importRegExp);
    if (!match) {
      return;
    }

    if (importPath.includes('internal/')) {
      return;
    }

    const indexesToPrune = [];

    path.node.specifiers.forEach((specifier, index) => {
      if (specifier.importKind && specifier.importKind !== 'value') {
        return;
      }
      if (specifier.type === 'ImportNamespaceSpecifier') {
        return;
      }

      if (specifier.type === 'ImportSpecifier') {
        const name = specifier.imported.name;

        if (name === 'ThemeProvider' || classesRegExp.test(name)) {
          return;
        }

        if (name === 'createTheme') {
          importsToAdd.styles ??= [];
          importsToAdd.styles.push(specifier);

          indexesToPrune.push(index);

          return;
        }

        importsToAdd[name] ??= [];
        importsToAdd[name].push(j.importDefaultSpecifier(specifier.local));

        indexesToPrune.push(index);
      }
    });

    // We prune imports starting with the highest index as otherwise subsequent indexes would become
    // invalid once an index that comes before it gets pruned.
    indexesToPrune.sort((a, b) => a - b).reverse();
    indexesToPrune.forEach((index) => path.get('specifiers', index).prune());

    if (!path.node.specifiers.length) {
      path.prune();
    }
  });

  Object.entries(importsToAdd).forEach(([module, specifiers]) => {
    const fullTargetModule = `${targetModule}/${module}`;

    addImports(root, j.importDeclaration(specifiers, j.stringLiteral(fullTargetModule)));
  });

  return root.toSource(printOptions);
}