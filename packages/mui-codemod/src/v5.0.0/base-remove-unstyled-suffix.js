/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const importedNameMap = new Map();

  let final = root
    .find(j.ImportDeclaration)
    .filter(({ node }) => {
      const sourceVal = node.source.value;
      if (sourceVal.startsWith('@mui/base')) {
        node.source.value = sourceVal.replace(/unstyled/i, '');
        node.source.raw = sourceVal.replace(/unstyled/i, '');
      }

      return sourceVal.startsWith('@mui/base');
    })
    .forEach((path) => {
      const specifiers = [];
      path.node.specifiers.forEach((elementNode) => {
        if (elementNode.type === 'ImportDefaultSpecifier') {
          return;
        }
        const importedName = elementNode.imported.name;
        if (importedName.endsWith('Unstyled')) {
          // component
          elementNode.imported.name = importedName.replace(/unstyled/i, '');
          if (elementNode.local.name === importedName) {
            elementNode.local.name = importedName;
            // specifier must be newly created to add "as";
            // e.g., import { SwitchUnstyled } to import { Switch as SwitchUnstyled}
            specifiers.push(j.importSpecifier(elementNode.imported, elementNode.local));
          }
          return;
        }
        if (importedName.toLowerCase().includes('unstyled') && !importedNameMap.has(importedName)) {
          // types, utils, etc
          importedNameMap.set(importedName, importedName.replace(/unstyled/gi, ''));
        }
      });
      if (specifiers.length > 0) {
        path.node.specifiers = specifiers;
      }
    })
    .toSource();

  importedNameMap.forEach((after, before) => {
    final = final.replaceAll(before, after);
  });

  return final;
}
