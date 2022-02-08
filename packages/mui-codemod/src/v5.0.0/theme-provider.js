/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/?(styles)?$/))
    .forEach((path) => {
      let previousVarName;
      path.node.specifiers.forEach((node) => {
        if (!node.imported && node.local.name === 'MuiThemeProvider') {
          // default specifier
          previousVarName = node.local.name;
          node.local.name = 'ThemeProvider';
        }

        if (node.imported && node.imported.name === 'MuiThemeProvider') {
          previousVarName = node.local.name;
          node.local = null;
          node.imported.name = 'ThemeProvider';
        }
      });

      if (previousVarName) {
        root.findJSXElements(previousVarName).forEach(({ node }) => {
          node.openingElement.name.name = 'ThemeProvider';
          if (node.closingElement) {
            node.closingElement.name.name = 'ThemeProvider';
          }
        });
      }
    });

  return root.toSource(printOptions);
}
