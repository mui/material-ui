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
      const sourceVal = node.source.value;

      return [
        '@mui/joy', // Process only Joy UI components
        '@mui/joy/Avatar', // Filter default imports of components other than `Avatar`
      ].includes(sourceVal);
    })
    .forEach((path) => {
      path.node.specifiers.forEach((elementNode) => {
        if (
          (elementNode.type === 'ImportSpecifier' && elementNode.imported?.name === 'Avatar') ||
          elementNode.type === 'ImportDefaultSpecifier'
        ) {
          // Process only Joy `Avatar` component
          root.findJSXElements(elementNode.local.name).forEach((elementPath) => {
            if (elementPath.node.type !== 'JSXElement') {
              return;
            }

            const slotPropsAttributeNode = elementPath.node.openingElement.attributes.find(
              (attributeNode) =>
                attributeNode.type === 'JSXAttribute' && attributeNode.name.name === 'slotProps',
            );
            elementPath.node.openingElement.attributes.forEach((attributeNode) => {
              if (attributeNode.type !== 'JSXAttribute') {
                return;
              }
              if (attributeNode.name.name === 'imgProps') {
                const val = attributeNode.value;
                if (!val?.expression) return;
                // attributeNode.name.name = 'orientation';
                // attributeNode.value = j.jsxExpressionContainer(j.literal('horizontal'));
                if (slotPropsAttributeNode) {
                  console.log(slotPropsAttributeNode);
                } else {
                  console.log(attributeNode);
                }
              }
            });
          });
        }
      });
    });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
