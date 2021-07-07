/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('Chip')

    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'variant' &&
          (node.value.value === 'default' || node.value.expression?.value === 'default')
        ) {
          delete attributes[index];
        }
      });
    })
    .toSource();
}
