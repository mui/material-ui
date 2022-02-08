/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  return j(file.source)
    .findJSXElements('Box')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'borderRadius') {
          // borderRadius={16} => borderRadius="16px"
          if (node.value.type === 'JSXExpressionContainer') {
            node.value = j.stringLiteral(`${node.value.expression.value}px`);
            // borderRadius="borderRadius" => borderRadius={1}
          } else if (node.value.value === 'borderRadius') {
            node.value = j.jsxExpressionContainer(j.numericLiteral(1));
          }
        }
      });
    })
    .toSource(printOptions);
}
