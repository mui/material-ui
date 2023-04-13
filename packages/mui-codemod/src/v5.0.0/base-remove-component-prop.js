/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const transformed = root.findJSXElements().forEach((elementPath) => {
    // Process only unstyled components
    if (
      !elementPath.node.openingElement.name.name.endsWith('Unstyled') ||
      elementPath.node.type !== 'JSXElement'
    ) {
      return;
    }

    const attributeNodes = [];

    let slotsPropNode;
    elementPath.node.openingElement.attributes.forEach((attributeNode) => {
      if (attributeNode.type !== 'JSXAttribute') {
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
          attributeNodes.push(slotsPropNode);
        }
        elementPath.node.openingElement.name.name +=
          valueNode.type === 'Literal' && valueNode.value && valueNode.raw
            ? `<${valueNode.raw}>`
            : `<typeof ${valueNode.name}>`;
      }
      
      if (attributeName === 'slots') {
        if (slotsPropNode && slotsPropNode.value.expression && attributeNode.value.expression) {
          slotsPropNode.value.expression.properties = [
            ...slotsPropNode.value.expression.properties,
            ...attributeNode.value.expression.properties,
          ];
        } else {
          slotsPropNode = attributeNode;
        }
      }
    });

    elementPath.node.openingElement.attributes = attributeNodes;
  });

  return transformed.toSource(printOptions);
}
