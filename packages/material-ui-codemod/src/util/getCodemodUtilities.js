/**
 * @typedef {import('jscodeshift').ImportDeclaration} ImportDeclaration
 * @typedef {import('jscodeshift').ImportSpecifier} ImportSpecifier
 * @typedef {import('jscodeshift').CallExpression} CallExpression
 */

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 * @returns
 */
export default function getCodemodUtilities(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  /**
   * @param {string | RegExp} importPath
   * @returns
   */
  function getImportDeclaration(importPath) {
    return root.find(j.ImportDeclaration).filter((path) => {
      if (importPath instanceof RegExp) {
        return !!path.node.source.value.match(importPath);
      }
      return path.node.source.value === importPath;
    });
  }

  /**
   * @param {string | RegExp} value
   * @returns
   */
  function getImportSpecifier(value) {
    return root.find(j.ImportSpecifier).filter((path) => {
      if (value instanceof RegExp) {
        return !!path.node.source.value.match(value);
      }
      return path.node.local.name === value;
    });
  }

  /**
   * @param {string} functionName
   * @returns
   */
  function getCallExpression(functionName) {
    return root.find(j.CallExpression, { callee: { name: functionName } });
  }

  /**
   * @param {string | RegExp} importPath
   * @param {(nodes: import('jscodeshift').Collection<ImportDeclaration>) => void} callback
   */
  function processImportFrom(importPath, callback) {
    const nodes = getImportDeclaration(importPath);
    callback(nodes);
  }

  /**
   * @param {string | RegExp} importPath
   * @param {(nodes: import('jscodeshift').Collection<ImportSpecifier>) => void} callback
   */
  function processImportSpecifier(value, callback) {
    const nodes = getImportDeclaration(value);
    callback(nodes);
  }

  /**
   * @param {string} importPath
   * @param {(nodes: import('jscodeshift').Collection<CallExpression>) => void} callback
   */
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
    if (variableName) {
      root.findJSXElements(variableName).forEach(({ node }) => {
        node.openingElement.name.name = newName;
        if (node.closingElement) {
          node.closingElement.name.name = newName;
        }
      });
    }
  }

  function renameFunctionCall(variableName, newName) {
    root.find(j.CallExpression, { callee: { name: variableName } }).forEach(({ node }) => {
      node.callee.name = newName;
    });
  }

  function processReturnStatement(node, callback) {
    if (node.type === 'VariableDeclarator') {
      callback(node.init.body.body.find((path) => path.type === 'ReturnStatement'));
    }
    if (node.type === 'FunctionDeclaration') {
      callback(node.body.body.find((path) => path.type === 'ReturnStatement'));
    }
  }

  /**
   *
   * @param {string} variableName
   * @param {string} path
   * @returns
   */
  function createImportDeclaration(variableName, path) {
    if (Array.isArray(variableName)) {
      return j.importDeclaration(
        variableName.map((name) => j.importSpecifier(j.identifier(name))),
        j.literal(path),
      );
    }
    return j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(variableName))],
      j.literal(path),
    );
  }

  return {
    root,
    jscodeshift: j,
    createImportDeclaration,
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
