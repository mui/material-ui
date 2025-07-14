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

  // Check if the file imports alpha, lighten, or darken from @mui/system/colorManipulator
  let hasAlphaImport = false;
  let hasLightenImport = false;
  let hasDarkenImport = false;

  root
    .find(j.ImportDeclaration, {
      source: {
        value: '@mui/system/colorManipulator',
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

  // Skip transformation if none of the functions are imported from @mui/system/colorManipulator
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

  return root.toSource(printOptions);
}
