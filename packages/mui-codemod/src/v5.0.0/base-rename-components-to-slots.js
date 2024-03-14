function transformComponentsProp(attributeNode) {
  attributeNode.name.name = 'slots';

  const valueExpression = attributeNode.value.expression;
  if (valueExpression?.type !== 'ObjectExpression') {
    return;
  }

  valueExpression.properties.forEach((property) => {
    property.key.name = property.key.name[0].toLowerCase() + property.key.name.slice(1);

    if (property.shorthand) {
      property.shorthand = false;
    }
  });
}

function transformComponentsPropsProp(attributeNode) {
  attributeNode.name.name = 'slotProps';
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const transformed = root.findJSXElements().forEach((path) => {
    // Process only unstyled components
    if (!path.node.openingElement.name.name.endsWith('Unstyled')) {
      return;
    }

    path.node.openingElement.attributes.forEach((node) => {
      if (node.type !== 'JSXAttribute') {
        return;
      }

      switch (node.name.name) {
        case 'components':
          transformComponentsProp(node);
          break;

        case 'componentsProps':
          transformComponentsPropsProp(node);
          break;

        default:
      }
    });
  });

  return transformed.toSource(printOptions);
}
