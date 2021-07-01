import getCodemodUtilities from '../util/getCodemodUtilities';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const utils = getCodemodUtilities(file, api);

  let importName = '';

  utils.processImportFrom('@material-ui/types', (nodes) => {
    nodes.forEach(({ node }) => {
      const previousVarName = utils.renameSpecifier(node.specifiers, 'Omit', 'DistributiveOmit');

      if (previousVarName) {
        importName = previousVarName;
      }
    });
  });

  const source = utils.root.toSource();
  if (importName) {
    return source.replace(/([^a-zA-Z])Omit</gm, '$1DistributiveOmit<');
  }
  return source;
}
