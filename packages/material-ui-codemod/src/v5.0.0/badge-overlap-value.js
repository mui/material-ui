/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  const source = j(file.source)
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
          node.value.expression.properties.forEach((subNode) => {
            if (subNode.key) {
              if (subNode.key.name.endsWith('Circle')) {
                subNode.key.name = subNode.key.name.replace('Circle', 'Circular');
              }
              if (subNode.key.name.endsWith('Rectangle')) {
                subNode.key.name = subNode.key.name.replace('Rectangle', 'Rectangular');
              }
            }
          });
        }
      });
    })
    .toSource();

  return source
    .replace(/(\.MuiBadge-.*)ircle/gm, '$1ircular')
    .replace(/(\.MuiBadge-.*)ectangle/gm, '$1ectangular');
}
