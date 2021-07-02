/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  const source = j(file.source)
    .findJSXElements('Skeleton')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'variant') {
          if (node.value.value === 'circle') {
            node.value.value = 'circular';
          }
          if (node.value.value === 'rect') {
            node.value.value = 'rectangular';
          }
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          node.value.expression.properties.forEach((subNode) => {
            if (subNode.key.name === 'circle') {
              subNode.key.name = 'circular';
            }
            if (subNode.key.name === 'rect') {
              subNode.key.name = 'rectangular';
            }
          });
        }
      });
    })
    .toSource();
  return source
    .replace(/\.MuiSkeleton-circle/gm, '.MuiSkeleton-circular')
    .replace(/\.MuiSkeleton-rect([^\w])/gm, '.MuiSkeleton-rectangular$1');
}
