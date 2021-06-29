import getCodemodUtilities from '../util/getCodemodUtilities';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options = {}) {
  const utils = getCodemodUtilities(file, api);
  const { root, jscodeshift: j } = utils;
  const printOptions = options.printOptions || { quote: 'single' };

  const stylesImports = utils.getImportDeclaration('@material-ui/core/styles');
  const styledEngineSpecifiers = utils.getImportSpecifier('StyledEngineProvider');
  /**
   * import StyledEngineProvider
   */
  if (!stylesImports.length) {
    let inserted = false;
    /**
     * Insert below react import
     */
    root.find(j.ImportDeclaration).forEach((path) => {
      if (path.node.source.value === 'react' && !inserted) {
        path.insertAfter(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('StyledEngineProvider'))],
            j.literal('@material-ui/core/styles'),
          ),
        );
        inserted = true;
      }
    });
  } else if (!styledEngineSpecifiers.length) {
    root.find(j.ImportDeclaration).forEach((path) => {
      if (path.node.source.value === '@material-ui/core/styles') {
        path.node.specifiers.push(j.importSpecifier(j.identifier('StyledEngineProvider')));
      }
    });
  }

  /**
   * add <StyledEngineProvider> as first child
   */
  const appName = utils.getExportDefaultDeclaration();
  let App = root.findVariableDeclarators(appName);
  if (App.length === 0) {
    App = root.find(j.FunctionDeclaration, { id: { name: appName } });
  }

  App.forEach((path) => {
    utils.processReturnStatement(path.node, (node) => {
      const shouldWrap =
        node.argument.type === 'JSXFragment' ||
        (node.argument.type === 'JSXElement' &&
          node.argument.openingElement.name.name !== 'StyledEngineProvider');
      if (shouldWrap) {
        const jsx = node.argument;
        const identifier = j.jsxIdentifier('StyledEngineProvider');
        node.argument = j.jsxElement(
          j.jsxOpeningElement(identifier, [j.jsxAttribute(j.jsxIdentifier('injectFirst'))]),
          j.jsxClosingElement(identifier),
          [j.jsxText('\n'), jsx, j.jsxText('\n')],
        );
      }
    });
  });

  return root.toSource(printOptions);
}
