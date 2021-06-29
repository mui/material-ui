import getCodemodUtilities from '../util/getCodemodUtilities';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const utils = getCodemodUtilities(file, api);

  const nodes = utils.getImportDeclaration('@material-ui/core/styles');

  if (nodes.length) {
    nodes.forEach(({ node }) => {
      const previousVarName = utils.renameSpecifier(
        node.specifiers,
        'MuiThemeProvider',
        'ThemeProvider',
      );
      /**
       * rename usage in JSX
       */
      utils.renameJSXTag(previousVarName, 'ThemeProvider');
    });
  }

  return utils.root.toSource();
}
