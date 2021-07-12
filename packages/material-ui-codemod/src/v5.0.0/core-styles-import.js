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

  let importStyles = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core/styles')
    .nodes()[0];

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value.match(/^@material-ui\/core\/styles\/.+$/))
    .forEach((path) => {
      const specifiers = path.node.specifiers.map((s) => {
        if (s.type === 'ImportDefaultSpecifier') {
          return j.importSpecifier(j.identifier(s.local.name));
        }
        return s;
      });

      if (!importStyles) {
        importStyles = j.importDeclaration(specifiers, j.literal('@material-ui/core/styles'));
        path.insertBefore(importStyles);
      } else {
        importStyles.specifiers.push(...specifiers);
      }
    })
    .remove();

  return root.toSource(printOptions);
}
