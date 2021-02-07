/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('Box')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (node.type === 'JSXAttribute') {
          if (node.name.name === 'gridGap') {
            node.name.name = 'gap';
          } else if (node.name.name === 'gridColumnGap') {
            node.name.name = 'columnGap';
          } else if (node.name.name === 'gridRowGap') {
            node.name.name = 'rowGap';
          }
        }
      });
    })
    .toSource();
}
