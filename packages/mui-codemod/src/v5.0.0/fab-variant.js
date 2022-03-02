/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const source = j(file.source)
    .findJSXElements('Fab')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'variant') {
          if (node.value.value === 'round' || node.value.expression?.value === 'round') {
            node.value = j.literal('circular');
          }
        }

        if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
          (node.value?.expression?.properties || []).forEach((subNode) => {
            if (subNode.key.name === 'round') {
              subNode.key.name = 'circular';
            }
          });
        }
      });
    })
    .toSource(printOptions);
  return source.replace(/\.MuiFab-round/gm, '.MuiFab-circular');
}
