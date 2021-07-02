/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let previousVarName;

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/?(styles)?$/))
    .at(0)
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

  return root.toSource();
}
