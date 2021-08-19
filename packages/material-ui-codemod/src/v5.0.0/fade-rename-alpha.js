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

  let importFound = false;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value.match(/^@material-ui\/core\/?(styles)?$/)) {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'fade') {
          specifier.imported = j.identifier('alpha');
          importFound = true;
        }
      });
    }
  });

  if (importFound) {
    return root
      .find(j.CallExpression, { callee: { name: 'fade' } })
      .forEach((path) => {
        path.node.callee.name = 'alpha';
      })
      .toSource(printOptions);
  }
  return file.source;
}
