/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  let source = j(file.source)
    .findJSXElements('Avatar')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'variant' &&
          node.value.value === 'circle'
        ) {
          node.value.value = 'circular';
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          node.value.expression.properties.forEach((subNode) => {
            if (subNode.key.name === 'circle') {
              subNode.key.name = 'circular';
            }
          });
        }
      });
    })
    .toSource();
  return source.replace(/\.MuiAvatar-circle/gm, '.MuiAvatar-circular');
}
