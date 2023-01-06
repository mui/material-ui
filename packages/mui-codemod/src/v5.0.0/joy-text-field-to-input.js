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
                  formControlAttributeNodes.push(attributeNode);
                  break;

                case 'label':
                  formLabelValue = attributeNode.value.value;
                  break;

                case 'helperText':
                  formHelperTextValue = attributeNode.value.value;
                  break;

                default:
              }
              if (!['size', 'label', 'helperText'].includes(attributeName)) {
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
                  j.jsxOpeningElement(formLabelIdentifier),
                  j.jsxClosingElement(formLabelIdentifier),
                  [j.jsxText(formLabelValue)],
                );
                childrenOfFormControl.push(formLabelElement, j.jsxText('\n'));
              }

              childrenOfFormControl.push(elementPath.node, j.jsxText('\n'));

              if (formHelperTextValue) {
                const formHelperTextIdentifier = j.jsxIdentifier('FormHelperText');
                const formHelperTextElement = j.jsxElement(
                  j.jsxOpeningElement(formHelperTextIdentifier),
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
