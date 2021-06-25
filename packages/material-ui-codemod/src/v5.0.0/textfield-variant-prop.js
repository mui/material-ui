/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('TextField')
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      const variant = attributes.find(
        (node) => node.type === 'JSXAttribute' && node.name.name === 'variant',
      );

      if (variant && variant.value.value === 'outlined') {
        delete attributes[
          attributes.findIndex(
            (node) => node.type === 'JSXAttribute' && node.name.name === 'variant',
          )
        ];
      }

      if (!variant) {
        attributes.push(j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('standard')));
      }
    })
    .toSource();
}
