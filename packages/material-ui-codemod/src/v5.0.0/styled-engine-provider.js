import getCodemodUtilities from '../util/getCodemodUtilities';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options = {}) {
  const utils = getCodemodUtilities(file, api);
  const { root, jscodeshift: j } = utils;
  const printOptions = options.printOptions || { quote: 'single' };

  let isImported = false;
  /**
   * try to import `StyledEngineProvider`
   */
  root
    .find(j.ImportSpecifier)
    .forEach(({ node }) => {
      if (node.imported.name === 'StyledEngineProvider') {
        isImported = true;
      }
    })
    .filter(
      ({ node }) =>
        node.imported.name === 'MuiThemeProvider' || node.imported.name === 'ThemeProvider',
    )
    .at(0)
    .forEach((path) => {
      if (!isImported) {
        path.insertAfter(j.importSpecifier(j.identifier('StyledEngineProvider')));
      }
    });

  /**
   * wrapped with <StyledEngineProvider>
   */
  let hasWrapped = false;

  function wrapJSX(name) {
    root.findJSXElements(name).forEach((element) => {
      const identifier = j.jsxIdentifier('StyledEngineProvider');
      const parent = element.parent;
      hasWrapped = true;

      if (parent.node.type === 'ReturnStatement') {
        const jsx = parent.node.argument;
        parent.node.argument = j.jsxElement(
          j.jsxOpeningElement(identifier, [j.jsxAttribute(j.jsxIdentifier('injectFirst'))]),
          j.jsxClosingElement(identifier),
          [j.jsxText('\n'), jsx, j.jsxText('\n')],
        );
      }

      if (
        parent.node.type === 'JSXElement' &&
        parent.node.openingElement.name.name !== 'StyledEngineProvider'
      ) {
        parent.node.children = [
          j.jsxElement(
            j.jsxOpeningElement(identifier, [j.jsxAttribute(j.jsxIdentifier('injectFirst'))]),
            j.jsxClosingElement(identifier),
            parent.node.children,
          ),
        ];
      }
    });
  }

  wrapJSX('MuiThemeProvider');

  if (!hasWrapped) {
    wrapJSX('ThemeProvider');
  }

  return root.toSource(printOptions);
}
