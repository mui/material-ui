const map = {
  xsDown: 'smDown',
  smDown: 'mdDown',
  mdDown: 'lgDown',
  lgDown: 'xlDown',
  xlDown: 'xlDown',
};

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('Hidden')
    .forEach((path) => {
      path.node.openingElement.attributes.forEach((node, index) => {
        if (node.type === 'JSXAttribute' && Object.keys(map).includes(node.name.name)) {
          node.name.name = map[node.name.name];
        }
      });
    })
    .toSource();
}
