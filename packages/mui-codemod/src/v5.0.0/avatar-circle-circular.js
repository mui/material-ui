/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const source = j(file.source)
    .findJSXElements('Avatar')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'variant' &&
          (node.value.value === 'circle' || node.value.expression?.value === 'circle')
        ) {
          node.value = j.literal('circular');
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          node.value?.expression?.properties?.forEach((subNode) => {
            if (subNode.key.name === 'circle') {
              subNode.key.name = 'circular';
            }
          });
        }
      });
    })
    .toSource(printOptions);
  return source.replace(/\.MuiAvatar-circle/gm, '.MuiAvatar-circular');
}
