/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  let importName = '';

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/^@material-ui\/types\/?$/))
    .forEach((path) => {
      let previousVarName;
      path.node.specifiers.forEach((node) => {
        if (!node.imported && node.local.name === 'Omit') {
          // default specifier
          previousVarName = node.local.name;
          node.local.name = 'DistributiveOmit';
        }

        if (node.imported && node.imported.name === 'Omit') {
          previousVarName = node.local.name;
          node.local = null;
          node.imported.name = 'DistributiveOmit';
        }
      });

      if (previousVarName) {
        importName = previousVarName;
      }
    });

  const source = root.toSource(printOptions);
  if (importName) {
    return source.replace(/([^a-zA-Z])Omit</gm, '$1DistributiveOmit<');
  }
  return source;
}
