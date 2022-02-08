/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  root
    .find(j.JSXElement)
    .filter(({ node }) => node.openingElement.name.name?.match(/^(Table|TableCell)$/))
    .forEach(({ node }) => {
      node.openingElement.attributes.forEach((attr) => {
        if (
          attr.name?.name === 'padding' &&
          (attr.value?.value === 'default' || attr.value?.expression?.value === 'default')
        ) {
          attr.value = j.literal('normal');
        }
      });
    });

  root.findJSXElements('TablePagination').forEach(({ node }) => {
    node.openingElement.attributes.forEach((attr) => {
      if (attr.type === 'JSXAttribute' && attr.name.name === 'onChangeRowsPerPage') {
        attr.name.name = 'onRowsPerPageChange';
      }
      if (attr.type === 'JSXAttribute' && attr.name?.name === 'onChangePage') {
        attr.name.name = 'onPageChange';
      }

      if (attr.type === 'JSXAttribute' && attr.name?.name === 'classes') {
        (attr.value.expression.properties || []).forEach((subNode) => {
          if (subNode.key.name === 'input') {
            subNode.key.name = 'select';
          }
        });
      }
    });
  });

  return root
    .toSource(printOptions)
    .replace(/\.MuiTablePagination-input/gm, '.MuiTablePagination-select');
}
