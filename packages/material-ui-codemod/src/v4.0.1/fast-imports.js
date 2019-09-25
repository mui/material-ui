const keepSpecifiers = ['withWidth'];

export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  let hasModifications = false;
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const importModule = options.importModule || '@material-ui';
  const targetModule = options.targetModule || '@material-ui/core';

  const root = j(fileInfo.source);
  const importRegExp = new RegExp(`^${importModule}/(.+)$`);

  root.find(j.ImportDeclaration).forEach(path => {
    const importPath = path.value.source.value;
    let entryModule = importPath.match(importRegExp);

    // Remove non-Material-UI imports
    if (!entryModule) {
      return;
    }
    entryModule = entryModule[1].split('/');
    entryModule = entryModule[entryModule.length - 1];

    if (entryModule !== 'core') {
      return;
    }

    hasModifications = true;

    if (keepSpecifiers.includes(entryModule)) {
      path.value.source.value = `${targetModule}/${entryModule}`;
      return;
    }

    path.node.specifiers.forEach(specifier => {
      const localName = specifier.local.name;
      const importedName = specifier.imported ? specifier.imported.name : null;

      if (!importedName) {
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(localName))],
          j.literal(`${targetModule}/${localName}`),
        );

        j(path).insertBefore(importStatement);
      } else {
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(localName))],
          j.literal(`${targetModule}/${importedName}`),
        );

        j(path).insertBefore(importStatement);
      }
    });

    path.prune();
  });

  return hasModifications ? root.toSource(printOptions) : null;
}
