const AffectedComponents = /Select|TextField|FormControl/;
export default function transformer(file, api) {
  const j = api.jscodeshift;

  function addExplicitStandardProp(path) {
    const attributes = path.node.openingElement.attributes;
    const variant = attributes.find(
      (node) => node.type === 'JSXAttribute' && node.name.name === 'variant',
    );

    if (!variant) {
      attributes.push(j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('standard')));
    }
  }

  return j(file.source)
    .find(j.JSXElement)
    .filter(({ value: node }) => {
      const elementName = node.openingElement.name.name;
      return AffectedComponents.test(elementName);
    })
    .forEach(addExplicitStandardProp)
    .toSource();
}
