/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  return j(file.source)
    .findJSXElements('InputLabel')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'size' &&
          (node.value.value === 'normal' || node.value.expression?.value === 'normal')
        ) {
          node.value = j.literal('medium');
        }
      });
    })
    .toSource(printOptions);
}
