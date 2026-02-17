/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  if (file.path?.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  // Check if the file imports alpha, lighten, or darken from @mui/system/colorManipulator or @mui/material/styles
  let hasAlphaImport = false;
  let hasLightenImport = false;
  let hasDarkenImport = false;

  const importSources = ['@mui/system/colorManipulator', '@mui/material/styles', '@mui/material'];

  importSources.forEach((source) => {
    root
      .find(j.ImportDeclaration, {
        source: {
          value: source,
        },
      })
      .forEach((path) => {
        path.node.specifiers.forEach((spec) => {
          if (spec.type === 'ImportSpecifier') {
            if (spec.imported.name === 'alpha') {
              hasAlphaImport = true;
            }
            if (spec.imported.name === 'lighten') {
              hasLightenImport = true;
            }
            if (spec.imported.name === 'darken') {
              hasDarkenImport = true;
            }
          }
        });
      });
  });

  // Skip transformation if none of the functions are imported
  if (!hasAlphaImport && !hasLightenImport && !hasDarkenImport) {
    return file.source;
  }

  function replaceThemeWithVars(node, objectName) {
    if (node.type === 'MemberExpression') {
      let deepnode = node;
      while (deepnode.object && deepnode.object.type === 'MemberExpression') {
        deepnode = deepnode.object;
      }

      deepnode.object = j.logicalExpression(
        '||',
        j.memberExpression(j.identifier(objectName), j.identifier('vars')),
        j.identifier(objectName),
      );
    }
    if (node.type === 'BinaryExpression') {
      return j.templateLiteral(
        [
          j.templateElement({ raw: '', cooked: '' }, false),
          j.templateElement({ raw: ' + ', cooked: ' + ' }, false),
          j.templateElement({ raw: '', cooked: '' }, true),
        ],
        [replaceThemeWithVars(node.left, objectName), replaceThemeWithVars(node.right, objectName)],
      );
    }
    return node;
  }

  // Transform alpha function
  if (hasAlphaImport) {
    root.find(j.ConditionalExpression).forEach((path) => {
      if (path.node.test.type === 'MemberExpression') {
        if (path.node.test.property.name === 'vars') {
          if (
            path.node.alternate.type === 'CallExpression' &&
            path.node.alternate.callee.name === 'alpha' &&
            path.node.consequent.type === 'TemplateLiteral'
          ) {
            path.replace(
              j.callExpression(
                j.memberExpression(j.identifier(path.node.test.object.name), j.identifier('alpha')),
                [
                  replaceThemeWithVars(
                    path.node.alternate.arguments[0],
                    path.node.test.object.name,
                  ),
                  replaceThemeWithVars(
                    path.node.alternate.arguments[1],
                    path.node.test.object.name,
                  ),
                ],
              ),
            );
          }
        }
      }
    });

    root
      .find(j.CallExpression, {
        callee: {
          name: 'alpha',
        },
      })
      .forEach((path) => {
        path.replace(
          j.callExpression(
            j.memberExpression(j.identifier('theme'), j.identifier('alpha')),
            path.node.arguments,
          ),
        );
      });
  }

  // Transform lighten function
  if (hasLightenImport) {
    root
      .find(j.CallExpression, {
        callee: {
          name: 'lighten',
        },
      })
      .forEach((path) => {
        path.replace(
          j.callExpression(
            j.memberExpression(j.identifier('theme'), j.identifier('lighten')),
            path.node.arguments,
          ),
        );
      });
  }

  // Transform darken function
  if (hasDarkenImport) {
    root
      .find(j.CallExpression, {
        callee: {
          name: 'darken',
        },
      })
      .forEach((path) => {
        path.replace(
          j.callExpression(
            j.memberExpression(j.identifier('theme'), j.identifier('darken')),
            path.node.arguments,
          ),
        );
      });
  }

  // Remove transformed functions from import statements
  importSources.forEach((source) => {
    root
      .find(j.ImportDeclaration, {
        source: {
          value: source,
        },
      })
      .forEach((path) => {
        const specifiers = path.node.specifiers.filter((spec) => {
          if (spec.type === 'ImportSpecifier') {
            const name = spec.imported.name;
            // Remove if it was transformed
            if (
              (name === 'alpha' && hasAlphaImport) ||
              (name === 'lighten' && hasLightenImport) ||
              (name === 'darken' && hasDarkenImport)
            ) {
              return false;
            }
          }
          return true;
        });

        if (specifiers.length === 0) {
          // Remove the import entirely if no specifiers left
          j(path).remove();
        } else {
          // Update the import with remaining specifiers
          path.node.specifiers = specifiers;
        }
      });
  });

  return root.toSource(printOptions);
}
