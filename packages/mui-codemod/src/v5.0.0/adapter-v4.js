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

  let adaptV4Called = false;

  function isNotadaptV4ThemeArg(node) {
    return (
      node.arguments.length &&
      (node.arguments[0].type !== 'CallExpression' ||
        (node.arguments[0].type === 'CallExpression' &&
          node.arguments[0].callee.name !== 'adaptV4Theme'))
    );
  }

  function hasAdaptV4(node) {
    return (
      node.arguments.length &&
      node.arguments[0].type === 'CallExpression' &&
      node.arguments[0].callee.name === 'adaptV4Theme'
    );
  }

  /**
   * add adapterV4 inside createMuiTheme
   */
  root.find(j.CallExpression, { callee: { name: 'createMuiTheme' } }).forEach(({ node }) => {
    if (hasAdaptV4(node)) {
      adaptV4Called = true;
    }
    if (isNotadaptV4ThemeArg(node)) {
      node.arguments = [j.callExpression(j.identifier('adaptV4Theme'), node.arguments)];
      adaptV4Called = true;
    }
  });

  /**
   * add adapterV4 inside createTheme
   */
  root.find(j.CallExpression, { callee: { name: 'createTheme' } }).forEach(({ node }) => {
    if (hasAdaptV4(node)) {
      adaptV4Called = true;
    }
    if (isNotadaptV4ThemeArg(node)) {
      node.arguments = [j.callExpression(j.identifier('adaptV4Theme'), node.arguments)];
      adaptV4Called = true;
    }
  });

  /**
   * Add `adaptV4Theme` if called from above and not existed
   */
  if (adaptV4Called) {
    const size = root
      .find(j.ImportDeclaration)
      .filter(
        ({ node }) =>
          node.source.value.match(/^@material-ui\/core\/?(styles)?$/) ||
          node.source.value.match(/^@mui\/material\/?(styles)$/),
      )
      .at(0)
      .forEach(({ node }) => {
        if (!node.specifiers.find(({ imported }) => imported.name === 'adaptV4Theme')) {
          node.specifiers = [...node.specifiers, j.importSpecifier(j.identifier('adaptV4Theme'))];
        }
      })
      .size();
    if (!size) {
      // create import
      root
        .find(j.ImportDeclaration)
        .at(0)
        .forEach((path) => {
          path.insertAfter(
            j.importDeclaration(
              [j.importSpecifier(j.identifier('adaptV4Theme'))],
              j.literal('@material-ui/core/styles'),
            ),
          );
        });
    }
  }

  return root.toSource(printOptions);
}
