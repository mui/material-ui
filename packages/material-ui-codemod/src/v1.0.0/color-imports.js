// This codemod attempts to fix the color imports breaking change introduced in
// https://github.com/mui-org/material-ui/releases/tag/v1.0.0-alpha.21

// List of colors that are in the `common` module
const commonColors = [
  'black',
  'white',
  'transparent',
  'fullBlack',
  'darkBlack',
  'lightBlack',
  'minBlack',
  'faintBlack',
  'fullWhite',
  'darkWhite',
  'lightWhite',
];

/**
 * Break down `colorIdentifier` into its `palette` and `hue`
 * e.g. lightBlue600 -> [lightBlue, 600]
 * @param {string} colorIdentifier
 */
function colorAccent(colorIdentifier) {
  const [, palette, hue] = colorIdentifier.match(/([A-za-z]+?)(A?\d+)?$/);
  return { palette, hue };
}

/**
 * Return color module path
 * @param {string} colorPalette
 */
function colorImportPath(colorPalette) {
  return commonColors.indexOf(colorPalette) !== -1 ? 'common' : colorPalette;
}

/**
 * Replace all expressions that use identifier to access color palettes.
 * e.g. colors.amber100 -> colors.amber['100']
 * @param {sting} identifier
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 */
function transformMemberExpressions(identifier, j, root) {
  // replace all expressions using `identifier` to access color palettes
  root.find(j.MemberExpression).forEach((path) => {
    if (path.node.object.name !== identifier) {
      return;
    }

    const colorProperty = path.node.property.name;
    const { palette, hue } = colorAccent(colorProperty);
    const colorModuleName = colorImportPath(palette);
    const property = hue || palette;

    path.node.property =
      hue || colorModuleName === 'common'
        ? j.memberExpression(
            j.identifier(colorModuleName),
            /^[_|a-z]/i.test(property) ? j.identifier(property) : j.literal(property),
          )
        : j.identifier(colorModuleName);
  });
}

/**
 * Replace all member imports.
 * e.g. import { red, blue } from 'material-ui/styles/colors'
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 * @param {string} importPath
 * @param {string} targetPath
 */
function transformMemberImports(j, root, importPath, targetPath) {
  // find member imports
  root.find(j.ImportDeclaration, { source: { value: importPath } }).forEach((importDeclaration) => {
    const memberImportSpecifiers = importDeclaration.node.specifiers.filter(
      (specifier) => specifier.type === 'ImportSpecifier',
    );
    if (memberImportSpecifiers.length) {
      j(importDeclaration).replaceWith(() => {
        const importDeclarations = [];
        const assignmentExpressions = [];

        memberImportSpecifiers.forEach((memberSpecifier) => {
          const { palette, hue } = colorAccent(memberSpecifier.imported.name);
          const colorModuleName = colorImportPath(palette);
          const modulePath = `${targetPath}/${colorModuleName}`;
          const colorIdentifier = j.identifier(colorModuleName);

          // import color module (if not already imported)
          if (importDeclarations.map((p) => p.source.value).indexOf(modulePath) === -1) {
            importDeclarations.push(
              j.importDeclaration(
                [j.importDefaultSpecifier(colorIdentifier)],
                j.literal(modulePath),
              ),
            );
          }

          // conditional assignment expression
          if (hue || colorModuleName === 'common') {
            const property = hue || palette;
            assignmentExpressions.push(
              j.variableDeclaration('const', [
                j.variableDeclarator(
                  j.identifier(memberSpecifier.local.name),
                  j.memberExpression(
                    colorIdentifier,
                    /^[_|a-z]/i.test(property) ? j.identifier(property) : j.literal(property),
                  ),
                ),
              ]),
            );
          }
        });

        return importDeclarations.concat(assignmentExpressions);
      });
    }
  });
}

/**
 * Replace all namespace imports.
 * e.g. import * as colors from 'material-ui/styles/colors'
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 * @param {string} importPath
 * @param {string} targetPath
 */
function transformNamespaceImports(j, root, importPath, targetPath) {
  // find namespace imports
  root.find(j.ImportDeclaration, { source: { value: importPath } }).forEach((importDeclaration) => {
    const namespaceImportSpecifier = importDeclaration.node.specifiers.find(
      (specifier) => specifier.type === 'ImportNamespaceSpecifier',
    );
    if (namespaceImportSpecifier) {
      j(importDeclaration).replaceWith(
        j.importDeclaration(
          [j.importNamespaceSpecifier(j.identifier(namespaceImportSpecifier.local.name))],
          j.literal(targetPath),
        ),
      );
      transformMemberExpressions(namespaceImportSpecifier.local.name, j, root);
    }
  });
}

module.exports = function transformer(fileInfo, api, options = {}) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const importPath = options.importPath || 'material-ui/styles/colors';
  const targetPath = options.targetPath || '@material-ui/core/colors';

  // transforms
  transformMemberImports(j, root, importPath, targetPath);
  transformNamespaceImports(j, root, importPath, targetPath);

  return root.toSource({ quote: 'single' });
};
