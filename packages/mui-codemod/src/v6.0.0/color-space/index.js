/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  if (file.path.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  function replaceThemeWithVars(node) {
    if (node.type === 'MemberExpression') {
      let deepnode = node;
      while (deepnode.object && deepnode.object.type === 'MemberExpression') {
        deepnode = deepnode.object;
      }

      deepnode.object = j.logicalExpression(
        '||',
        j.memberExpression(j.identifier('theme'), j.identifier('vars')),
        j.identifier('theme'),
      );
    }
    return node;
  }

  root.find(j.ConditionalExpression).forEach((path) => {
    if (path.node.test.type === 'MemberExpression') {
      if (path.node.test.object.name === 'theme' && path.node.test.property.name === 'vars') {
        if (
          path.node.alternate.type === 'CallExpression' &&
          path.node.alternate.callee.name === 'alpha'
        ) {
          path.replace(
            j.callExpression(j.memberExpression(j.identifier('theme'), j.identifier('alpha')), [
              replaceThemeWithVars(path.node.alternate.arguments[0]),
              path.node.alternate.arguments[1],
            ]),
          );
        }
      }
    }
  });

  return root.toSource(printOptions);
}
