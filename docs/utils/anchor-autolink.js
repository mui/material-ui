const visit = require('unist-util-visit');

function inject(node, id) {
  delete node.data.hProperties.id;

  const text = node.children[0] && node.children[0].value;
  node.data.hChildren = [
    {
      type: 'element',
      tagName: 'a',
      properties: { id, className: ['anchor-link'] },
    },
    {
      type: 'text',
      value: text,
    },
    {
      type: 'element',
      tagName: 'a',
      children: [{ type: 'text', value: '#' }],
      properties: { href: '#' + id, className: ['anchor-link-style'] },
    },
  ];
}

module.exports = () => (tree, file) => {
  visit(tree, 'heading', node => {
    const { data } = node;
    const id = data && data.hProperties && data.hProperties.id;

    if (id) {
      inject(node, id);
    }
  });
};
