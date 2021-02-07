/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('CircularProgress')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'variant' &&
          node.value.value === 'static'
        ) {
          node.value.value = 'determinate';
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          node.value.expression.properties.forEach((node) => {
            if (node.key.name === 'static') {
              node.key.name = 'determinate';
            }
          });
        }
      });
    })
    .toSource();
}
