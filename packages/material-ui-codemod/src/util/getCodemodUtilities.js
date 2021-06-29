/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function getCodemodUtilities(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function getImportDeclaration(importPath) {
    return root.find(j.ImportDeclaration).filter((path) => {
      return path.node.source.value === importPath;
    });
  }

  function getImportSpecifier(value) {
    return root.find(j.ImportSpecifier).filter((path) => {
      return path.node.local.name === value;
    });
  }

  function getCallExpression(functionName) {
    return root.find(j.CallExpression, { callee: { name: functionName } });
  }

  function processImportFrom(importPath, callback) {
    const nodes = getImportDeclaration(importPath);
    callback(nodes);
  }

  function processImportSpecifier(value, callback) {
    const nodes = getImportDeclaration(value);
    callback(nodes);
  }

  function processCallExpression(functionName, callback) {
    callback(getCallExpression(functionName));
  }

  function getExportDefaultDeclaration() {
    let name;
    root.find(j.ExportDefaultDeclaration).forEach((path) => {
      if (!name) {
        name = path.node.declaration.name;
      }
    });
    return name;
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

  function insertImportSpecifier(node, name, options) {
    const { prepend = false } = options || {};
    if (!node.specifiers.find((s) => s.local.name === name)) {
      const specifier = j.importSpecifier(j.identifier(name));
      if (prepend) {
        node.specifiers = [specifier, ...node.specifiers];
      } else {
        node.specifiers.push(specifier);
      }
    }
  }

  function renameJSXTag(variableName, newName) {
    root.findJSXElements(variableName).forEach(({ node }) => {
      node.openingElement.name.name = newName;
      if (node.closingElement) {
        node.closingElement.name.name = newName;
      }
    });
  }

  function renameFunctionCall(variableName, newName) {
    root.find(j.CallExpression, { callee: { name: variableName } }).forEach(({ node }) => {
      node.callee.name = newName;
    });
  }

  /**
   * works with both arrow function and function declaration
   * @param {*} node
   * @param {*} callback
   */
  function processReturnStatement(node, callback) {
    if (node.type === 'VariableDeclarator') {
      callback(node.init.body.body.find((path) => path.type === 'ReturnStatement'));
    }
    if (node.type === 'FunctionDeclaration') {
      callback(node.body.body.find((path) => path.type === 'ReturnStatement'));
    }
  }

  return {
    root,
    jscodeshift: j,
    getImportDeclaration,
    getImportSpecifier,
    getExportDefaultDeclaration,
    getCallExpression,
    insertImportSpecifier,
    processImportFrom,
    processImportSpecifier,
    processReturnStatement,
    processCallExpression,
    renameSpecifier,
    renameJSXTag,
    renameFunctionCall,
  };
}
