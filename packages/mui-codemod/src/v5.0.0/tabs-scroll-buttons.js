/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  root.findJSXElements('Tabs').forEach(({ node }) => {
    let prevScrollButtonValue;
    node.openingElement.attributes.forEach((attr) => {
      if (attr.name && attr.name.name === 'scrollButtons') {
        if (attr.value) {
          prevScrollButtonValue = attr.value.value || attr.value.expression?.value;
          if (attr.value.value === 'on' || attr.value.expression?.value === 'on') {
            delete attr.value;
          } else if (attr.value.value === 'desktop' || attr.value.expression?.value === 'desktop') {
            delete attr.value;
          } else if (attr.value.value === 'off' || attr.value.expression?.value === 'off') {
            attr.value = j.jsxExpressionContainer(j.literal(false));
          }
        }
      }
    });

    if (prevScrollButtonValue === 'on') {
      node.openingElement.attributes.push(
        j.jsxAttribute(j.jsxIdentifier('allowScrollButtonsMobile')),
      );
    }
  });

  return root.toSource(printOptions);
}
