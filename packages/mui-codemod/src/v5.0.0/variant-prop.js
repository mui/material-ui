const TargetMuiComponents = ['TextField', 'Select', 'FormControl'];

export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  function addExplicitStandardProp(path) {
    const attributes = path.node.openingElement.attributes;
    const variant = attributes.find(
      (node) => node.type === 'JSXAttribute' && node.name.name === 'variant',
    );

    if (!variant) {
      attributes.unshift(j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('standard')));
    }
  }

  const AffectedComponents = [];

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) =>
      node.source.value.match(
        /^(@material-ui\/core|@mui\/material)(\/TextField|\/Select|\/FormControl)?$/,
      ),
    )
    .forEach(({ node }) => {
      node.specifiers.forEach(({ local, imported }) => {
        if (!imported || (imported && TargetMuiComponents.includes(imported.name))) {
          AffectedComponents.push(local.name);
        }
      });
    });

  return j(file.source)
    .find(j.JSXElement)
    .filter(({ value: node }) => {
      const elementName = node.openingElement.name.name;
      return AffectedComponents.includes(elementName);
    })
    .forEach(addExplicitStandardProp)
    .toSource(printOptions);
}
