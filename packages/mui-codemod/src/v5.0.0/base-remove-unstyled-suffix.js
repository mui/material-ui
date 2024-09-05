/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const transformed = root
    .find(j.ImportDeclaration)
    .filter(({ node }) => {
      const sourceVal = node.source.value;
      return sourceVal.startsWith('@mui/base');
    })
    .forEach((path) => {
      const sourceVal = path.node.source.value;
      if (sourceVal.startsWith('@mui/base')) {
        path.node.source = j.stringLiteral(sourceVal.replace(/unstyled/im, ''));
      }
      const specifiers = [];
      path.node.specifiers.forEach((elementNode) => {
        const importedName = elementNode.imported?.name || '';
        if (elementNode.type === 'ImportSpecifier' && importedName.match(/unstyled/im)) {
          elementNode.imported.name = importedName.replace(/unstyled/im, '');
          if (elementNode.local.name === importedName) {
            // specifier must be newly created to add "as";
            // e.g., import { SwitchUnstyled } to import { Switch as SwitchUnstyled}
            specifiers.push(j.importSpecifier(elementNode.imported, elementNode.local));
            return;
          }
        }

        specifiers.push(elementNode);
      });

      path.node.specifiers = specifiers;
    })
    .toSource();

  return transformed;
}
