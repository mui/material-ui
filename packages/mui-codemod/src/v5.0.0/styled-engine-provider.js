/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options = {}) {
  const j = api.jscodeshift;
  const root = j(file.source);
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

      if (
        parent.node.type !== 'JSXElement' ||
        (parent.node.type === 'JSXElement' &&
          parent.node.openingElement.name.name !== 'StyledEngineProvider')
      ) {
        hasWrapped = true;
        element.replace(
          j.jsxElement(
            j.jsxOpeningElement(identifier, [j.jsxAttribute(j.jsxIdentifier('injectFirst'))]),
            j.jsxClosingElement(identifier),
            [j.jsxText('\n'), element.node, j.jsxText('\n')],
          ),
        );
      }
    });
  }

  wrapJSX('MuiThemeProvider');

  if (!hasWrapped) {
    wrapJSX('ThemeProvider');
  }

  return root.toSource(printOptions);
}
