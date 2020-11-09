const visit = require('unist-util-visit');

module.exports = () => (tree) => {
  visit(tree, 'table', (node) => {
    node.data = { hProperties: { className: ['mui-pickers-markdown-table'] } };
  });
};
