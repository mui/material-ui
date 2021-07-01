import getCodemodUtilities from '../util/getCodemodUtilities';

const TargetMuiComponents = ['TextField', 'Select', 'FormControl'];

export default function transformer(file, api) {
  const utils = getCodemodUtilities(file, api);
  const { jscodeshift: j } = utils;

  function addExplicitStandardProp(path) {
    const attributes = path.node.openingElement.attributes;
    const variant = attributes.find(
      (node) => node.type === 'JSXAttribute' && node.name.name === 'variant',
    );

    if (!variant) {
      attributes.push(j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('standard')));
    }
  }

  const AffectedComponents = [];

  utils.processImportFrom(
    /^@material-ui\/core(\/TextField|\/Select|\/FormControl)?$/,
    (collection) => {
      collection.forEach(({ node }) => {
        node.specifiers.forEach(({ local, imported }) => {
          if (!imported || (imported && TargetMuiComponents.includes(imported.name))) {
            AffectedComponents.push(local.name);
          }
        });
      });
    },
  );

  return j(file.source)
    .find(j.JSXElement)
    .filter(({ value: node }) => {
      const elementName = node.openingElement.name.name;
      return AffectedComponents.includes(elementName);
    })
    .forEach(addExplicitStandardProp)
    .toSource();
}
