/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  return j(file.source)
    .findJSXElements('MenuItem')
    .forEach((path) => {
      if (!path.node.openingElement.selfClosing) {
        return;
      }

      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        if (node.type === 'JSXAttribute' && node.name.name === 'primaryText') {
          delete attributes[index];

          path.node.openingElement.selfClosing = false;
          path.node.children = [node.value];
          path.node.closingElement = j.jsxClosingElement(path.node.openingElement.name);
        }
      });
    })
    .toSource(printOptions);
}
