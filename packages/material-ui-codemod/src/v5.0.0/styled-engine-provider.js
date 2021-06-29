/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  function containImportFrom(value) {
    return (
      root
        .find(j.ImportDeclaration)
        .filter((path) => {
          return path.node.source.value === value;
        })
        .size() >= 1
    );
  }

  function containImportLocal(value) {
    return (
      root
        .find(j.ImportSpecifier)
        .filter((path) => {
          return path.node.local.name === value;
        })
        .size() >= 1
    );
  }

  function getAppName() {
    let name;
    root.find(j.ExportDefaultDeclaration).forEach((path) => {
      if (!name) {
        name = path.node.declaration.name;
      }
    });
    return name;
  }

  /**
   * import StyledEngineProvider
   */
  if (!containImportFrom('@material-ui/core/styles')) {
    let inserted = false;
    /**
     * Insert below react import
     */
    root.find(j.ImportDeclaration).forEach((path) => {
      if (path.node.source.value === 'react' && !inserted) {
        path.insertAfter(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('StyledEngineProvider'))],
            j.literal('@material-ui/core/styles'),
          ),
        );
        inserted = true;
      }
    });
  } else if (!containImportLocal('StyledEngineProvider')) {
    root.find(j.ImportDeclaration).forEach((path) => {
      if (path.node.source.value === '@material-ui/core/styles') {
        path.node.specifiers.push(j.importSpecifier(j.identifier('StyledEngineProvider')));
      }
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
   * add <StyledEngineProvider> as first child
   */
  const appName = getAppName();
  let App = root.findVariableDeclarators(appName);
  if (App.length === 0) {
    App = root.find(j.FunctionDeclaration, { id: { name: appName } });
  }

  App.forEach((path) => {
    processReturnStatement(path.node, (node) => {
      const shouldWrap =
        node.argument.type === 'JSXFragment' ||
        (node.argument.type === 'JSXElement' &&
          node.argument.openingElement.name.name !== 'StyledEngineProvider');
      if (shouldWrap) {
        const jsx = node.argument;
        const identifier = j.jsxIdentifier('StyledEngineProvider');
        node.argument = j.jsxElement(
          j.jsxOpeningElement(identifier, [j.jsxAttribute(j.jsxIdentifier('injectFirst'))]),
          j.jsxClosingElement(identifier),
          [j.jsxText('\n'), jsx, j.jsxText('\n')],
        );
      }
    });
  });

  return root.toSource(printOptions);
}
