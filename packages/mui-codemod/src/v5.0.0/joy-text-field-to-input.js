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
      if (sourceVal === '@mui/joy/TextField') {
        node.source.value = '@mui/joy/Input';
      }

      return [
        '@mui/joy', // Process only Joy UI components
        '@mui/joy/TextField', // Filter default imports of components other than TextField
      ].includes(sourceVal);
    })
    .forEach((path) => {
      path.node.specifiers.forEach((elementNode) => {
        if (
          (elementNode.type === 'ImportSpecifier' && elementNode.imported?.name === 'TextField') ||
          elementNode.type === 'ImportDefaultSpecifier'
        ) {
          if (elementNode.imported?.name === 'TextField') {
            elementNode.imported.name = 'Input';
          }

          let newElementName;
          root.findJSXElements(elementNode.local.name).forEach((elementPath) => {
            if (elementPath.node.type !== 'JSXElement') {
              return;
            }
            newElementName = elementPath.node.openingElement.name.name.replaceAll(
              'TextField',
              'Input',
            );
            elementPath.node.openingElement.name.name = newElementName;

            const formControlAttributeNodes = [];
            const formLabelAttributeNodes = [];
            const formHelperTextAttributeNodes = [];
            const inputAttributeNodes = [];
            let formLabelValue;
            let formHelperTextValue;

            elementPath.node.openingElement.attributes.forEach((attributeNode) => {
              if (attributeNode.type !== 'JSXAttribute') {
                return;
              }
              const attributeName = attributeNode.name.name;
              switch (attributeName) {
                case 'size':
                case 'variant':
                case 'color':
                  formControlAttributeNodes.push(attributeNode);
                  break;

                case 'slotProps':
                  if (attributeNode.value.expression?.type === 'ObjectExpression') {
                    attributeNode.value.expression.properties.forEach((propNode) => {
                      if (propNode.value.type !== 'ObjectExpression') {
                        return;
                      }
                      propNode.value.properties.forEach((prop) => {
                        const key = prop.key.value;
                        const value = prop.value.value;
                        const newAttributeNode = j.jsxAttribute(
                          j.jsxIdentifier(key),
                          j.jsxExpressionContainer(j.booleanLiteral(value)),
                        );
                        switch (propNode.key.name) {
                          case 'root':
                            formControlAttributeNodes.push(newAttributeNode);
                            break;
                          case 'label':
                            formLabelAttributeNodes.push(newAttributeNode);
                            break;
                          case 'input':
                            inputAttributeNodes.push(newAttributeNode);
                            break;
                          case 'helperText':
                            formHelperTextAttributeNodes.push(newAttributeNode);
                            break;
                          default:
                        }
                      });
                    });
                  }
                  break;

                case 'label':
                  formLabelValue = attributeNode.value.value;
                  break;

                case 'helperText':
                  formHelperTextValue = attributeNode.value.value;
                  break;

                case 'id':
                  formLabelAttributeNodes.push(
                    j.jsxAttribute(
                      j.jsxIdentifier('id'),
                      j.literal(`${attributeNode.value.value}-label`),
                    ),
                    j.jsxAttribute(
                      j.jsxIdentifier('htmlFor'),
                      j.literal(attributeNode.value.value),
                    ),
                  );
                  formHelperTextAttributeNodes.push(
                    j.jsxAttribute(
                      j.jsxIdentifier('id'),
                      j.literal(`${attributeNode.value.value}-helper-text`),
                    ),
                  );
                  break;

                case 'required':
                  formLabelAttributeNodes.push(attributeNode);
                  break;

                default:
              }
              if (
                !['size', 'variant', 'color', 'slotProps', 'label', 'helperText'].includes(
                  attributeName,
                )
              ) {
                inputAttributeNodes.push(attributeNode);
              }
            });

            elementPath.node.openingElement.attributes = inputAttributeNodes;

            if (formControlAttributeNodes.length > 0 || formLabelValue || formHelperTextValue) {
              const formControlIdentifier = j.jsxIdentifier('FormControl');
              const childrenOfFormControl = [];

              if (formLabelValue) {
                const formLabelIdentifier = j.jsxIdentifier('FormLabel');
                const formLabelElement = j.jsxElement(
                  j.jsxOpeningElement(formLabelIdentifier, formLabelAttributeNodes),
                  j.jsxClosingElement(formLabelIdentifier),
                  [j.jsxText(formLabelValue)],
                );
                childrenOfFormControl.push(formLabelElement, j.jsxText('\n'));
              }

              childrenOfFormControl.push(elementPath.node, j.jsxText('\n'));

              if (formHelperTextValue) {
                const formHelperTextIdentifier = j.jsxIdentifier('FormHelperText');
                const formHelperTextElement = j.jsxElement(
                  j.jsxOpeningElement(formHelperTextIdentifier, formHelperTextAttributeNodes),
                  j.jsxClosingElement(formHelperTextIdentifier),
                  [j.jsxText(formHelperTextValue)],
                );
                childrenOfFormControl.push(formHelperTextElement);
              }

              elementPath.replace(
                j.jsxElement(
                  j.jsxOpeningElement(formControlIdentifier, formControlAttributeNodes),
                  j.jsxClosingElement(formControlIdentifier),
                  [j.jsxText('\n'), ...childrenOfFormControl, j.jsxText('\n')],
                ),
              );
            }
          });
          if (newElementName) {
            elementNode.local.name = newElementName;
          }
        }
      });
    });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
