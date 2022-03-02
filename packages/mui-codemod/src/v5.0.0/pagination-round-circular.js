/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const source = j(file.source)
    .find(j.JSXElement)
    .filter(({ node }) => node.openingElement.name.name?.match(/^(Pagination|PaginationItem)$/))
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node) => {
        if (
          node.type === 'JSXAttribute' &&
          node.name.name === 'shape' &&
          (node.value.value === 'round' || node.value.expression?.value === 'round')
        ) {
          node.value = j.literal('circular');
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
  return source.replace(/\.(MuiPagination|MuiPaginationItem)-round/gm, '.$1-circular');
}
