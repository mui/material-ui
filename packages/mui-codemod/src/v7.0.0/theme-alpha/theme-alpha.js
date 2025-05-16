/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  if (file.path?.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  function replaceThemeWithVars(node, objectName) {
    if (node.type === 'MemberExpression') {
      let deepnode = node;
      while (deepnode.object && deepnode.object.type === 'MemberExpression') {
        deepnode = deepnode.object;
      }

      deepnode.object = j.logicalExpression(
        '||',
        j.memberExpression(j.identifier(objectName), j.identifier('vars')),
        j.identifier(objectName),
      );
    }
    if (node.type === 'BinaryExpression') {
      return j.templateLiteral(
        [
          j.templateElement({ raw: '', cooked: '' }, false),
          j.templateElement({ raw: ' + ', cooked: ' + ' }, false),
          j.templateElement({ raw: '', cooked: '' }, true),
        ],
        [replaceThemeWithVars(node.left, objectName), replaceThemeWithVars(node.right, objectName)],
      );
    }
    return node;
  }

  root.find(j.ConditionalExpression).forEach((path) => {
    if (path.node.test.type === 'MemberExpression') {
      if (path.node.test.property.name === 'vars') {
        if (
          path.node.alternate.type === 'CallExpression' &&
          path.node.alternate.callee.name === 'alpha' &&
          path.node.consequent.type === 'TemplateLiteral'
        ) {
          path.replace(
            j.callExpression(
              j.memberExpression(j.identifier(path.node.test.object.name), j.identifier('alpha')),
              [
                replaceThemeWithVars(path.node.alternate.arguments[0], path.node.test.object.name),
                replaceThemeWithVars(path.node.alternate.arguments[1], path.node.test.object.name),
              ],
            ),
          );
        }
      }
    }
  });

  return root.toSource(printOptions);
}
