import getCodemodUtilities from '../util/getCodemodUtilities';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const printOptions = options.printOptions || { quote: 'single' };
  const utils = getCodemodUtilities(file, api);

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
  ];

  const stylesPackage = '@material-ui/styles';

  utils.processImportFrom('@material-ui/core/styles', (nodes) => {
    nodes.forEach((path) => {
      const importList = [];
      const removedList = [];
      path.node.specifiers.forEach(({ imported }, index) => {
        if (list.includes(imported.name)) {
          importList.push(
            utils.createImportDeclaration(imported.name, `${stylesPackage}/${imported.name}`),
          );
          removedList.push(index);
        }
      });
      path.node.specifiers = path.node.specifiers.filter(
        (_, index) => !removedList.includes(index),
      );
      path.insertAfter(...importList);
    });
  });

  return utils.root.toSource(printOptions);
}
