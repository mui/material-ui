/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const source = j(file.source)
    .findJSXElements('Badge')

    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'overlap') {
          if (node.value.value === 'circle' || node.value.expression?.value === 'circle') {
            node.value = j.literal('circular');
          } else if (
            node.value.value === 'rectangle' ||
            node.value.expression?.value === 'rectangle'
          ) {
            node.value = j.literal('rectangular');
          }
        }

        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'classes' &&
          Array.isArray(node.value?.expression?.properties)
        ) {
          node.value?.expression?.properties?.forEach((subNode) => {
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
    .toSource(printOptions);

  return source
    .replace(/(\.MuiBadge-.*)ircle/gm, '$1ircular')
    .replace(/(\.MuiBadge-.*)ectangle/gm, '$1ectangular');
}
