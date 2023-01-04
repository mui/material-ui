/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root.find(j.ImportDeclaration).forEach(({ node }) => {
    const sourceVal = node.source.value;
    if (sourceVal.startsWith('@mui/joy')) {
      if (sourceVal === '@mui/joy/TextField') {
        node.source.value = '@mui/joy/Input';
      } else {
        node.specifiers.forEach((elementNode) => {
          if (elementNode.imported?.name === 'TextField') {
            elementNode.imported.name = 'Input';
          }
        });
      }
    }
  });

  const transformed = root.findJSXElements();

  return transformed.toSource(printOptions);
}
