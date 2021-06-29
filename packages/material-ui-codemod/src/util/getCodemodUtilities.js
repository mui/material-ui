export default function getCodemodUtilities(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function getImportDeclaration(importPath) {
    return root.find(j.ImportDeclaration).filter((path) => {
      return path.node.source.value === importPath;
    });
  }

  function renameSpecifier(specifiers, currentName, newName) {
    let previousVarName;
    specifiers.forEach((node) => {
      if (!node.imported && node.local.name === currentName) {
        // default specifier
        previousVarName = node.local.name;
        node.local.name = newName;
      }

      if (node.imported && node.imported.name === currentName) {
        previousVarName = node.local.name;
        node.local = null;
        node.imported.name = newName;
      }
    });
    return previousVarName;
  }

  function renameJSXTag(variableName, newName) {
    root.findJSXElements(variableName).forEach(({ node }) => {
      node.openingElement.name.name = newName;
      if (node.closingElement) {
        node.closingElement.name.name = newName;
      }
    });
  }

  return {
    root,
    jscodeshift: j,
    getImportDeclaration,
    renameSpecifier,
    renameJSXTag,
  };
}
