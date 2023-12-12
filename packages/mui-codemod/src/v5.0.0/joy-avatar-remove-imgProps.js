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
                attributeNode.type === 'JSXAttribute' &&
                attributeNode.name.name === 'slotProps' &&
                attributeNode.value.expression?.type === 'ObjectExpression',
            );
            const newAttributeNodes = [];
            elementPath.node.openingElement.attributes.forEach((attributeNode) => {
              if (attributeNode.type !== 'JSXAttribute') {
                return;
              }

              if (attributeNode.name.name !== 'imgProps') {
                newAttributeNodes.push(attributeNode);
                return;
              }

              const val = attributeNode.value;
              if (!val?.expression) {
                return;
              }

              if (slotPropsAttributeNode) {
                const imgObjInSlotProps = slotPropsAttributeNode.value.expression.properties.find(
                  (propNode) =>
                    propNode.key.name === 'img' && propNode.value.type === 'ObjectExpression',
                );
                if (imgObjInSlotProps) {
                  const newProperties = [
                    ...imgObjInSlotProps.value.properties,
                    ...attributeNode.value.expression.properties,
                  ];
                  imgObjInSlotProps.value.properties = newProperties;
                } else {
                  slotPropsAttributeNode.value.expression.properties.push(
                    j.objectProperty(j.identifier('img'), attributeNode.value),
                  );
                }
              } else {
                newAttributeNodes.push(
                  j.jsxAttribute(
                    j.jsxIdentifier('slotProps'),
                    j.jsxExpressionContainer(
                      j.objectExpression([
                        j.objectProperty(j.identifier('img'), attributeNode.value.expression),
                      ]),
                    ),
                  ),
                );
              }
            });
            elementPath.node.openingElement.attributes = newAttributeNodes;
          });
        }
      });
    });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
