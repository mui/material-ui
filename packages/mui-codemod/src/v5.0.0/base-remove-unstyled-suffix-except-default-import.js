/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const variableNameMap = new Map();

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
      path.node.specifiers.forEach((elementNode) => {
        if (elementNode.type === 'ImportDefaultSpecifier') {
          return;
        }
        const variableName = elementNode.local.name;
        if (variableName.toLowerCase().includes('unstyled') && !variableNameMap.has(variableName)) {
          variableNameMap.set(variableName, variableName.replace(/unstyled/gi, ''));
        }
      });
    })
    .toSource();

  variableNameMap.forEach((after, before) => {
    final = final.replaceAll(before, after);
  });

  return final;
}
