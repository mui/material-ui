const entryModuleToFlatten = [
  'Menu',
  'Tabs',
  'BottomNavigation',
  'Card',
  'Collapse',
  'List',
  'Dialog',
  'Slide',
  'Radio',
  'ExpansionPanel',
  'GridList',
  'Progress',
  'Form',
  'Fade',
  'Stepper',
  'Table',
  'Input',
  'Grow',
];

export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  let hasModifications = false;
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const root = j(fileInfo.source);
  const importRegExp = /^material-ui\/(.+)/;

  root.find(j.ImportDeclaration).forEach(path => {
    const importPath = path.value.source.value;
    let entryModule = importPath.match(importRegExp);

    // Remove non-Material-UI imports
    if (!entryModule) {
      return;
    }
    entryModule = entryModule[1].split('/');
    entryModule = entryModule[entryModule.length - 1];

    // No need to flatten
    if (!entryModuleToFlatten.includes(entryModule)) {
      return;
    }

    hasModifications = true;
    // console.log('entryModule', entryModule);

    path.node.specifiers.forEach(specifier => {
      const localName = specifier.local.name;
      const importedName = specifier.imported ? specifier.imported.name : null;

      if (!importedName) {
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(localName))],
          j.literal(`material-ui/${entryModule}`),
        );

        j(path).insertBefore(importStatement);
      } else {
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(localName))],
          j.literal(`material-ui/${importedName}`),
        );

        j(path).insertBefore(importStatement);
      }
    });

    path.prune();
  });

  return hasModifications ? root.toSource(printOptions) : null;
}
