import getCodemodUtilities from '../util/getCodemodUtilities';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const utils = getCodemodUtilities(file, api);
  const { jscodeshift: j } = utils;

  let adaptV4Called = false;

  function isNotadaptV4ThemeArg(node) {
    return (
      node.arguments.length &&
      (node.arguments[0].type !== 'CallExpression' ||
        (node.arguments[0].type === 'CallExpression' &&
          node.arguments[0].callee.name !== 'adaptV4Theme'))
    );
  }

  /**
   * add adapterV4 inside createMuiTheme
   */
  utils.processCallExpression('createMuiTheme', (nodes) => {
    nodes.forEach(({ node }) => {
      if (isNotadaptV4ThemeArg(node)) {
        node.arguments = [j.callExpression(j.identifier('adaptV4Theme'), node.arguments)];
        adaptV4Called = true;
      }
    });
  });

  /**
   * add adapterV4 inside createTheme
   */
  utils.processCallExpression('createTheme', (nodes) => {
    nodes.forEach(({ node }) => {
      if (isNotadaptV4ThemeArg(node)) {
        node.arguments = [j.callExpression(j.identifier('adaptV4Theme'), node.arguments)];
        adaptV4Called = true;
      }
    });
  });

  /**
   * Add `adaptV4Theme` if called from above and not existed
   */
  if (adaptV4Called) {
    utils.processImportFrom('@material-ui/core/styles', (nodes) => {
      nodes.forEach(({ node }) => {
        utils.insertImportSpecifier(node, 'adaptV4Theme');
      });
    });
  }

  return utils.root.toSource();
}
