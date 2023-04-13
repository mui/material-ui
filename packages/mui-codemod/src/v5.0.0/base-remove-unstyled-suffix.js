/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const variableNameMap = new Map();
  let final = file.source;
  
  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.startsWith('@mui/base'))
    .forEach((path) => {
      path.node.specifiers.forEach((elementNode) => {
        const variableName = elementNode.local.name;
        if (variableName.toLowerCase().includes('unstyled') && !variableNameMap.has(variableName)) {
          variableNameMap.set(variableName, variableName.replace(/unstyled/gi, ''));
        }
      });
    });

  variableNameMap.forEach((after, before) => {
    final = final.replaceAll(before, after);
  });

  return final;
}
