/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findJSXElements('IconButton')
    .forEach((path) => {
      const hasSizeAttribute = path.node.openingElement.attributes.some((node) => {
        return node.type === 'JSXAttribute' && node.name.name === 'size';
      });

      if (!hasSizeAttribute) {
        path.node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('size'), j.literal('large')),
        );
      }
    })
    .toSource();
}
