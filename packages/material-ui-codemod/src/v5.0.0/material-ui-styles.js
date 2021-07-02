/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const printOptions = options.printOptions || { quote: 'single' };
  const j = api.jscodeshift;
  const root = j(file.source);

  const list = [
    'createGenerateClassName',
    'createStyles',
    'jssPreset',
    'makeStyles',
    'ServerStyleSheets',
    'useThemeVariants',
    'withStyles',
    'withTheme',
    'getStylesCreator',
    'mergeClasses',
    'StylesProvider',
  ];
  const types = [
    'GenerateClassNameOptions',
    'StyleRules',
    'StyleRulesCallback',
    'Styles',
    'ClassNameMap',
    'WithStylesOptions',
    'WithStyles',
    'StyledComponentProps',
    'WithThemeCreatorOption',
    'WithTheme',
    'ThemedComponentProps',
    'StylesCreator',
    'Classes',
    'MergeClassesOption',
    'StylesOptions',
    'StylesProviderProps',
    'StylesContext',
  ];

  const stylesPackage = '@material-ui/styles';

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/?(styles)?$/))
    .forEach((path) => {
      const importList = [];
      const typeList = [];
      const removedList = [];
      const specifiers = path.node.specifiers;

      specifiers.forEach(({ imported, local }, index) => {
        if (types.includes(imported.name)) {
          typeList.push({ imported, local });
          removedList.push(index);
        }
        if (list.includes(imported.name)) {
          importList.push(
            j.importDeclaration(
              [j.importDefaultSpecifier(j.identifier(local.name))],
              j.literal(`${stylesPackage}/${imported.name}`),
            ),
          );
          removedList.push(index);
        }
      });

      /**
       * delete path.node.specifiers[index] cause empty item in array
       * use this approach until we find a better way
       */
      path.node.specifiers = path.node.specifiers.filter(
        (_, index) => !removedList.includes(index),
      );

      path.insertAfter(...importList);
      if (typeList.length) {
        const appendedSpecifiers = typeList.map(({ imported, local }) =>
          j.importSpecifier(imported, local),
        );
        const muiStyles = root
          .find(j.ImportDeclaration)
          .filter(({ node }) => node.source.value.match(/^@material-ui\/styles\/?$/));
        if (muiStyles.size()) {
          muiStyles.forEach(({ node }) => {
            node.specifiers = [...node.specifiers, ...appendedSpecifiers];
          });
        } else {
          path.insertAfter(j.importDeclaration(appendedSpecifiers, j.literal(stylesPackage)));
        }
      }
    })
    .filter((path) => !path.node.specifiers.length)
    .remove();

  return root.toSource(printOptions);
}
