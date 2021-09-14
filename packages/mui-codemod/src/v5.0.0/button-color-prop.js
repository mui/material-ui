/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  return j(file.source)
    .findJSXElements('Button')

    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'color' &&
          (node.value.value === 'default' || node.value.expression?.value === 'default')
        ) {
          delete attributes[index];
        }
      });
    })
    .toSource(printOptions);
}
