/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.findJSXElements('Tabs').forEach(({ node }) => {
    let prevScrollButtonValue;
    node.openingElement.attributes.forEach((attr) => {
      if (attr.name && attr.name.name === 'scrollButtons') {
        if (attr.value) {
          prevScrollButtonValue = attr.value.value;
          if (attr.value.value === 'on') {
            delete attr.value;
          } else if (attr.value.value === 'desktop') {
            delete attr.value;
          } else if (attr.value.value === 'off') {
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

  return root.toSource();
}
