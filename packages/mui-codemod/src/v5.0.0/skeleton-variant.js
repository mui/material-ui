/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const source = j(file.source)
    .findJSXElements('Skeleton')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'variant') {
          if (node.value.value === 'circle' || node.value.expression?.value === 'circle') {
            node.value = j.literal('circular');
          }
          if (node.value.value === 'rect' || node.value.expression?.value === 'rect') {
            node.value = j.literal('rectangular');
          }
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          node.value?.expression?.properties?.forEach((subNode) => {
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
    .toSource(printOptions);
  return source
    .replace(/\.MuiSkeleton-circle/gm, '.MuiSkeleton-circular')
    .replace(/\.MuiSkeleton-rect([^\w])/gm, '.MuiSkeleton-rectangular$1');
}
