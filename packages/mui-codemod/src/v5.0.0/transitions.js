/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || { quote: 'single' };

  const root = j(file.source);

  let variableName;

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value === '@material-ui/core/styles/transitions')
    .forEach((path) => {
      const specifier = path.node.specifiers[0];
      if (specifier) {
        if (specifier.type === 'ImportDefaultSpecifier') {
          variableName = specifier.local.name;
        }
        specifier.local = j.identifier('createTransitions');
      }
      path.node.source = j.literal('@material-ui/core/styles/createTransitions');
    });

  if (variableName) {
    root
      .find(j.ImportDeclaration)
      .at(-1)
      .insertAfter(`const ${variableName} = createTransitions({});`);
  }

  return root.toSource(printOptions);
}
