import getCodemodUtilities from '../util/getCodemodUtilities';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const utils = getCodemodUtilities(file, api);

  utils.processImportFrom(/^@material-ui\/core\/?(styles)?$/, (nodes) => {
    nodes.forEach(({ node }) => {
      const previousVarName = utils.renameSpecifier(
        node.specifiers,
        'createMuiTheme',
        'createTheme',
      );

      utils.renameFunctionCall(previousVarName, 'createTheme');
    });
  });

  return utils.root.toSource();
}
