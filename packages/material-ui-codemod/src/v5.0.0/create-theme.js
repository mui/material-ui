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

  if (file.source.match(/(function\s*createTheme|const\s*createTheme)/g)) {
    root
      .find(j.ImportDeclaration)
      .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/?(styles)?$/))
      .forEach(({ node }) => {
        let localName;
        node.specifiers.forEach((specifier, index) => {
          if (specifier.imported.name === 'createMuiTheme') {
            localName = specifier.local.name;
            delete node.specifiers[index];
          }
        });
        if (localName) {
          node.specifiers.push(
            j.importSpecifier(j.identifier('createTheme'), j.identifier(localName)),
          );
        }
      });
  } else {
    let previousVarName;

    root
      .find(j.ImportDeclaration)
      .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/?(styles)?$/))
      .forEach(({ node }) => {
        node.specifiers.forEach((specifier) => {
          if (!specifier.imported && specifier.local.name === 'createMuiTheme') {
            // default specifier
            previousVarName = specifier.local.name;
            specifier.local.name = 'createTheme';
          }

          if (specifier.imported && specifier.imported.name === 'createMuiTheme') {
            previousVarName = specifier.local.name;
            specifier.local = null;
            specifier.imported.name = 'createTheme';
          }
        });
      });

    root.find(j.CallExpression, { callee: { name: previousVarName } }).forEach(({ node }) => {
      node.callee.name = 'createTheme';
    });
  }

  return root.toSource(printOptions);
}
