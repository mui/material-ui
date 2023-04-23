/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const transformed = root
    .find(j.ImportDeclaration)
    // Process only Base UI components
    .filter(({ node }) => node.source.value.startsWith('@mui/base'))
    .forEach((path) => {
      path.node.specifiers.forEach((elementNode) => {
        root.findJSXElements(elementNode.local.name).forEach((elementPath) => {
          if (elementPath.node.type !== 'JSXElement') {
            return;
          }

          const attributeNodes = [];

          let slotPropNodeInserted = false;
          let slotsPropNode;
          elementPath.node.openingElement.attributes.forEach((attributeNode) => {
            if (
              attributeNode.type !== 'JSXAttribute' &&
              attributeNode.type !== 'JSXSpreadAttribute'
            ) {
              return;
            }
            if (attributeNode.type === 'JSXSpreadAttribute') {
              attributeNodes.push(attributeNode);
              return;
            }
            const attributeName = attributeNode.name.name;
            if (attributeName !== 'component' && attributeName !== 'slots') {
              attributeNodes.push(attributeNode);
              return;
            }

            if (attributeName === 'component') {
              const valueNode = attributeNode.value.expression || attributeNode.value;
              const rootObject = j.objectProperty(j.identifier('root'), valueNode);
              if (slotsPropNode && slotsPropNode.value.expression) {
                slotsPropNode.value.expression.properties.push(rootObject);
              } else {
                slotsPropNode = j.jsxAttribute(
                  j.jsxIdentifier('slots'),
                  j.jsxExpressionContainer(j.objectExpression([rootObject])),
                );
                if (!slotPropNodeInserted) {
                  slotPropNodeInserted = true;
                  attributeNodes.push(slotsPropNode);
                }
              }

              if (file.path.endsWith('.ts') || file.path.endsWith('.tsx')) {
                if (valueNode.type === 'Literal' && valueNode.value && valueNode.raw) {
                  elementPath.node.openingElement.name.name += `<${valueNode.raw}>`;
                } else if (valueNode.type === 'Identifier' && valueNode.name) {
                  elementPath.node.openingElement.name.name += `<typeof ${valueNode.name}>`;
                }
              }
            }

            if (attributeName === 'slots') {
              if (
                slotsPropNode &&
                slotsPropNode.value.expression &&
                attributeNode.value.expression
              ) {
                slotsPropNode.value.expression.properties = [
                  ...slotsPropNode.value.expression.properties,
                  ...attributeNode.value.expression.properties,
                ];
              } else {
                slotsPropNode = attributeNode;
              }
              if (!slotPropNodeInserted) {
                slotPropNodeInserted = true;
                attributeNodes.push(slotsPropNode);
              }
            }
          });

          elementPath.node.openingElement.attributes = attributeNodes;
        });
      });
    });

  return transformed.toSource(printOptions);
}
