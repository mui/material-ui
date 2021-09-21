export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  const jsxLinkNames = [];

  /**
   * find Link import name
   */
  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value === '@material-ui/core/Link')
    .forEach(({ node }) => {
      node.specifiers.forEach((s) => {
        if (s.type === 'ImportDefaultSpecifier') {
          jsxLinkNames.push(s.local.name);
        }
      });
    });

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/?$/))
    .forEach(({ node }) => {
      node.specifiers.forEach((s) => {
        if (s.imported.name === 'Link') {
          jsxLinkNames.push(s.local.name);
        }
      });
    });

  jsxLinkNames.forEach((name) => {
    root.findJSXElements(name).forEach(({ node }) => {
      const hasUnderlineProp = node.openingElement.attributes.find(
        (attr) => attr?.name?.name === 'underline',
      );
      if (!hasUnderlineProp) {
        node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('underline'), j.literal('hover')),
        );
      }
    });
  });

  return root.toSource(printOptions);
}
