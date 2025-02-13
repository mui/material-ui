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

          elementPath.node.openingElement.attributes.forEach((elementNode) => {
            if (elementNode.type !== 'JSXAttribute') {
              return;
            }

            switch (elementNode.name.name) {
              case 'components':
                transformComponentsProp(elementNode);
                break;

              case 'componentsProps':
                transformComponentsPropsProp(elementNode);
                break;

              default:
            }
          });
        });
      });
    });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
