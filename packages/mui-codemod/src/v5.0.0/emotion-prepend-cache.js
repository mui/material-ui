/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options = {}) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single', trailingComma: true };

  let emotionCacheName;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === '@emotion/cache') {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          emotionCacheName = specifier.local.name;
        }
      });
    }
  });

  root.find(j.CallExpression, { callee: { name: emotionCacheName } }).forEach(({ node }) => {
    const objExpression = node.arguments[0];
    if (objExpression && objExpression.type === 'ObjectExpression') {
      const prop = objExpression.properties.find((p) => p.key.name === 'prepend');
      if (!prop) {
        objExpression.properties.push(j.property('init', j.identifier('prepend'), j.literal(true)));
      } else if (prop && prop.kind === 'init' && prop.value.value === false) {
        prop.value = j.literal(true);
      }
    }
  });
  return root.toSource(printOptions);
}
