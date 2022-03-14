const moveToTssReact = [
  'makeStyles',
  'withStyles',
];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  const withStylesCall = root.find(j.CallExpression, { callee: { name: 'withStyles' } }).nodes()[0];
  const makeStylesCall = root.find(j.CallExpression, { callee: { name: 'makeStyles' } }).nodes()[0];

  if (!withStylesCall && !makeStylesCall) {
    return file.source;
  }
  let importsChanged = false;
  /**
   * transform imports
   */
  root.find(j.ImportDeclaration)
    .forEach((path) => {
      const importSource = path.node.source.value;
      if (importSource === '@material-ui/core/styles') {
        const specifiersToMove = [];
        const specifiersToStay = [];
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            if (moveToTssReact.includes(specifier.imported.name)) {
              specifiersToMove.push(specifier);
            } else {
              specifiersToStay.push(specifier);
            }
          }
        });

        if (specifiersToMove.length > 0) {
          path.replace(
            j.importDeclaration(specifiersToMove, j.stringLiteral('tss-react/mui')),
            specifiersToStay.length > 0 ? j.importDeclaration(specifiersToStay, j.stringLiteral('@material-ui/core/styles')) : undefined,
          );
          importsChanged = true;
        }
      }
    });
  if (!importsChanged) {
    return file.source;
  }
  const styleHooks = [];
  root
    .find(j.CallExpression, { callee: { name: 'makeStyles' } }).forEach((path) => {
    path.node.callee.name = 'makeStyles()';
  }).closest(j.VariableDeclarator).forEach((path) => {
    styleHooks.push(path.node.id.name);
  });
  styleHooks.forEach((hookName) => {
    root
      .find(j.CallExpression, { callee: { name: hookName } }).closest(j.VariableDeclarator).forEach((path) => {
      path.node.id.name = "{ classes }";
    });
  });
  return root
    .toSource(printOptions)
}
