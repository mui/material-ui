/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => {
      return node.source.value.startsWith('@mui/joy');
    })
    .forEach((path) => {
      path.node.specifiers.forEach((node) => {
        // Process only Joy UI components
        root.findJSXElements(node.local.name).forEach((elementPath) => {
          if (elementPath.node.type !== 'JSXElement') {
            return;
          }

          elementPath.node.openingElement.attributes.forEach((attributeNode) => {
            if (attributeNode.type !== 'JSXAttribute') {
              return;
            }
            if (attributeNode.name.name === 'row') {
              const val = attributeNode.value;
              if (val === null || val?.expression?.value === true) {
                attributeNode.name.name = 'orientation';
                attributeNode.value = j.jsxExpressionContainer(j.literal('horizontal'));
              }
            }
          });
        });
      });
    });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
