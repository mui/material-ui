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

      // Process only Joy UI components
      return sourceVal.startsWith('@mui/joy');
    })
    .forEach((path) => {
      path.node.specifiers.forEach((elementNode) => {
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
        });

        elementNode.local.name = newElementName;
      });
    });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
