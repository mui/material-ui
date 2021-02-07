/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('Badge')

    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'overlap') {
          if (node.value.value === 'circle') {
            node.value.value = 'circular';
          } else if (node.value.value === 'rectangle') {
            node.value.value = 'rectangular';
          }
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          node.value.expression.properties.forEach((node) => {
            if (node.key.name.endsWith('Circle')) {
              node.key.name = node.key.name.replace('Circle', 'Circular');
            }
            if (node.key.name.endsWith('Rectangle')) {
              node.key.name = node.key.name.replace('Rectangle', 'Rectangular');
            }
          });
        }
      });
    })
    .toSource();
}
