const nodePath = require('path');

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function getFileNameWithoutExt() {
    return nodePath.basename(file.path).replace(/^([^.]*)\.(.*)/, '$1');
  }

  /**
   *
   * @param {import('jscodeshift').CallExpression} withStylesCall
   */
  function getPrefix(withStylesCall) {
    let prefix;

    // 1. check from withStylesFn
    if (withStylesCall && withStylesCall.arguments[1] && withStylesCall.arguments[1].properties) {
      const name = withStylesCall.arguments[1].properties.find((prop) => prop.key.name === 'name');
      prefix = name.value.value;
    }

    if (!prefix) {
      // 2. check name from export default
      root.find(j.ExportDefaultDeclaration).forEach((path) => {
        prefix = path.node.declaration.name;
      });
    }

    if (!prefix) {
      // 3. use name export that is Capitalize
      root.find(j.ExportNamedDeclaration).forEach((path) => {
        const name = path.node.declaration.declarations[0].id.name;
        if (!prefix && name.match(/^[A-Z]/)) {
          prefix = name;
        }
      });
    }

    if (!prefix) {
      // 4. use file name
      prefix = getFileNameWithoutExt();
    }

    return prefix;
  }

  function getFirstJsxName() {
    const matches = file.source.match(/<\/?(\w*)[\s\S]*?>/gm);
    if (matches) {
      const closingTag = matches.slice(-1)[0];
      return closingTag.substring(2, closingTag.length - 1);
    }
    return null;
  }

  function getRootClassKeys() {
    const name = getFirstJsxName();
    if (name) {
      const rootClassKeys = [];
      root
        .findJSXElements(name)
        .at(0)
        .forEach((path) => {
          const existingClassName = path.node.openingElement.attributes.find(
            (attr) => attr.name && attr.name.name === 'className',
          );
          if (existingClassName) {
            if (existingClassName.value.type === 'StringLiteral') {
              // className="string"
            }

            if (existingClassName.value.type === 'JSXExpressionContainer') {
              if (existingClassName.value.expression.type === 'StringLiteral') {
                // className={'string'}
              }

              if (existingClassName.value.expression.type === 'MemberExpression') {
                // className={classes.root}
                if (existingClassName.value.expression.object.name === 'classes') {
                  rootClassKeys.push(existingClassName.value.expression.property.name);
                }
              }

              if (existingClassName.value.expression.type === 'CallExpression') {
                // className={clsx(classes.root)}
                existingClassName.value.expression.arguments.forEach((arg) => {
                  if (arg.type === 'MemberExpression') {
                    if (arg.object.name === 'classes') {
                      rootClassKeys.push(arg.property.name);
                    }
                  }

                  if (arg.type === 'ObjectExpression') {
                    arg.properties.forEach((prop) => {
                      if (prop.key.object && prop.key.object.name === 'classes') {
                        rootClassKeys.push(prop.key.property.name);
                      }
                    });
                  }
                });
              }
            }
          }
        });
      return rootClassKeys;
    }
    return [];
  }

  function isTagNameFragment(tagName) {
    return tagName === 'React.Fragment' || tagName === 'Fragment' || tagName === '';
  }

  function isTagNameSuspense(tagName) {
    return tagName === 'React.Suspense' || tagName === 'Suspense';
  }

  function createStyledComponent(componentName, styledComponentName, stylesFn) {
    let styleArg = null;
    const rootIsFragment = isTagNameFragment(componentName);

    if (rootIsFragment) {
      // The root is React.Fragment
      styleArg = j.stringLiteral('div');
    } else if (componentName.match(/^[A-Z]/)) {
      // The root is a component
      styleArg = j.identifier(componentName);
    } else {
      styleArg = j.stringLiteral(componentName);
    }

    const declaration = j.variableDeclaration('const', [
      j.variableDeclarator(
        j.identifier(styledComponentName),
        j.callExpression(j.callExpression(j.identifier('styled'), [styleArg]), [stylesFn]),
      ),
    ]);

    if (rootIsFragment) {
      declaration.comments = [
        j.commentLine(
          ' TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.',
        ),
      ];
    }

    return declaration;
  }

  /**
   *
   * @param {import('jscodeshift').ObjectExpression} objExpression
   */
  function createClasses(objExpression) {
    const classes = j.objectExpression([]);
    objExpression.properties.forEach((prop) => {
      classes.properties.push(
        j.objectProperty(
          prop.key,
          j.templateLiteral(
            [
              j.templateElement({ raw: '', cooked: '' }, false),
              j.templateElement({ raw: `-${prop.key.name}`, cooked: `-${prop.key.name}` }, true),
            ],
            [j.identifier('PREFIX')],
          ),
        ),
      );
    });
    return classes;
  }

  /**
   *
   * @param {import('jscodeshift').ArrowFunctionExpression | import('jscodeshift').FunctionDeclaration} functionExpression
   */
  function getReturnStatement(functionExpression) {
    if (functionExpression.type === 'ObjectExpression') {
      return functionExpression;
    }
    if (functionExpression.type === 'ArrowFunctionExpression') {
      if (functionExpression.body.type === 'BlockStatement') {
        const returnStatement = functionExpression.body.body.find(
          (b) => b.type === 'ReturnStatement',
        );
        return returnStatement.argument;
      }
      if (functionExpression.body.type === 'ObjectExpression') {
        return functionExpression.body;
      }
      if (functionExpression.body.type === 'CallExpression') {
        if (functionExpression.body.callee.name === 'createStyles') {
          return functionExpression.body.arguments[0];
        }
      }
    }
    if (functionExpression.type === 'FunctionDeclaration') {
      const returnStatement = functionExpression.body.body.find(
        (b) => b.type === 'ReturnStatement',
      );
      return returnStatement.argument;
    }
    if (functionExpression.type === 'CallExpression') {
      if (functionExpression.callee.name === 'createStyles') {
        return functionExpression.arguments[0];
      }
    }
    return null;
  }

  /**
   *
   * @param {import('jscodeshift').ArrowFunctionExpression | import('jscodeshift').FunctionDeclaration} functionExpression
   */
  function convertToStyledArg(functionExpression, rootKeys = []) {
    let objectExpression;
    if (functionExpression.type === 'ObjectExpression') {
      objectExpression = functionExpression;
    }
    if (functionExpression.type === 'ArrowFunctionExpression') {
      if (functionExpression.body.type === 'BlockStatement') {
        const returnStatement = functionExpression.body.body.find(
          (b) => b.type === 'ReturnStatement',
        );
        objectExpression = returnStatement.argument;
      }
      if (functionExpression.body.type === 'ObjectExpression') {
        functionExpression.body.extra.parenthesized = false;
        objectExpression = functionExpression.body;
      }
    }
    if (functionExpression.type === 'FunctionDeclaration') {
      functionExpression.type = 'FunctionExpression';
      const returnStatement = functionExpression.body.body.find(
        (b) => b.type === 'ReturnStatement',
      );
      objectExpression = returnStatement.argument;
    }
    if (objectExpression) {
      objectExpression.properties.forEach((prop) => {
        const selector = rootKeys.includes(prop.key.name) ? '&.' : '& .';
        prop.key = j.templateLiteral(
          [
            j.templateElement({ raw: selector, cooked: selector }, false),
            j.templateElement({ raw: '', cooked: '' }, true),
          ],
          [j.identifier(`classes.${prop.key.name}`)],
        );
        prop.computed = true;
        return prop;
      });
    }

    if (functionExpression.params) {
      functionExpression.params = functionExpression.params.map((param) => {
        if (param.type === 'ObjectPattern') {
          return j.objectPattern([j.objectProperty(j.identifier('theme'), param)]);
        }
        const prop = j.objectProperty(param, param);
        prop.shorthand = true;
        return j.objectPattern([prop]);
      });
    }

    return functionExpression;
  }

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  /**
   * find withStyles, makeStyles arg variable
   * ex. withStyles(styles, options)
   * - styles: can be variable or () => { ... }
   * - options: { name }
   */

  /**
   * get the styles ASP
   * - ArrowFunctionExpression
   * - FunctionDeclaration
   */

  const withStylesCall = root.find(j.CallExpression, { callee: { name: 'withStyles' } }).nodes()[0];
  const makeStylesCall = root.find(j.CallExpression, { callee: { name: 'makeStyles' } }).nodes()[0];

  if (!withStylesCall && !makeStylesCall) {
    return file.source;
  }

  const rootJsxName = getFirstJsxName();
  if (isTagNameSuspense(rootJsxName)) {
    return file.source;
  }
  const styledComponentName =
    rootJsxName.match(/^[A-Z]/) && !isTagNameFragment(rootJsxName)
      ? `Styled${rootJsxName}`.replace('.', '')
      : 'Root';

  const prefix = getPrefix(withStylesCall || makeStylesCall);
  const rootClassKeys = getRootClassKeys();
  const result = {};
  if (withStylesCall) {
    let stylesFnName;
    root
      .find(j.CallExpression, { callee: { name: 'withStyles' } })
      .at(0)
      .forEach((path) => {
        const arg = path.node.arguments[0];
        if (arg.type === 'Identifier') {
          stylesFnName = arg.name;
        }
        const objectExpression = getReturnStatement(arg);
        if (objectExpression) {
          result.classes = createClasses(objectExpression, prefix);
          result.styledArg = convertToStyledArg(arg, rootClassKeys);
        }
      });

    root
      .find(j.VariableDeclarator, { id: { name: stylesFnName } })
      .at(0)
      .forEach((path) => {
        let fnArg = path.node.init;

        const objectExpression = getReturnStatement(fnArg);
        if (fnArg.type === 'ArrowFunctionExpression') {
          if (fnArg.body.type === 'CallExpression') {
            if (fnArg.body.callee.name === 'createStyles') {
              fnArg.body = fnArg.body.arguments[0];
            }
          }
        }
        if (fnArg.type === 'CallExpression') {
          if (fnArg.callee.name === 'createStyles') {
            fnArg = fnArg.arguments[0];
          }
        }
        if (objectExpression) {
          result.classes = createClasses(objectExpression, prefix);
          result.styledArg = convertToStyledArg(fnArg, rootClassKeys);
        }
      })
      .remove();

    root
      .find(j.FunctionDeclaration, { id: { name: stylesFnName } })
      .at(0)
      .forEach((path) => {
        const returnStatement = path.node.body.body.find((b) => b.type === 'ReturnStatement');
        result.classes = createClasses(returnStatement.argument, prefix);
        result.styledArg = convertToStyledArg(path.node, rootClassKeys);
      })
      .remove();
  }

  if (makeStylesCall) {
    let stylesFnName;
    root
      .find(j.CallExpression, { callee: { name: 'makeStyles' } })
      .at(0)
      .forEach((path) => {
        let arg = path.node.arguments[0];
        if (arg.type === 'Identifier') {
          stylesFnName = arg.name;
        }
        const objectExpression = getReturnStatement(arg);
        if (arg.type === 'ArrowFunctionExpression') {
          if (arg.body.type === 'CallExpression') {
            if (arg.body.callee.name === 'createStyles') {
              arg.body = arg.body.arguments[0];
            }
          }
        }
        if (arg.type === 'CallExpression') {
          if (arg.callee.name === 'createStyles') {
            arg = arg.arguments[0];
          }
        }
        if (objectExpression) {
          result.classes = createClasses(objectExpression, prefix);
          result.styledArg = convertToStyledArg(arg, rootClassKeys);
        }
      });

    root
      .find(j.VariableDeclarator, { id: { name: stylesFnName } })
      .at(0)
      .forEach((path) => {
        const objectExpression = getReturnStatement(path.node.init);
        if (objectExpression) {
          result.classes = createClasses(objectExpression, prefix);
          result.styledArg = convertToStyledArg(path.node.init, rootClassKeys);
        }
      })
      .remove();

    root
      .find(j.FunctionDeclaration, { id: { name: stylesFnName } })
      .at(0)
      .forEach((path) => {
        const returnStatement = path.node.body.body.find((b) => b.type === 'ReturnStatement');
        result.classes = createClasses(returnStatement.argument, prefix);
        result.styledArg = convertToStyledArg(path.node, rootClassKeys);
      })
      .remove();

    root
      .find(j.VariableDeclaration)
      .filter((path) => path.node.declarations.some((d) => d.id.name === 'useStyles'))
      .remove();
  }

  /**
   * create `classes`
   * create styled `Root`
   */
  root
    .find(j.ImportDeclaration)
    .at(-1)
    .forEach((path) => {
      path.insertAfter(
        j.variableDeclaration('const', [
          j.variableDeclarator(j.identifier('PREFIX'), j.stringLiteral(prefix)),
        ]),
        j.variableDeclaration('const', [
          j.variableDeclarator(j.identifier('classes'), result.classes),
        ]),
        createStyledComponent(rootJsxName, styledComponentName, result.styledArg),
      );
    });

  function transformJsxRootToStyledComponent(path) {
    if (path.node.openingFragment) {
      path.node.type = 'JSXElement';
      path.node.openingElement = { type: 'JSXOpeningElement', name: styledComponentName };
      path.node.closingElement = { type: 'JSXClosingElement', name: styledComponentName };
    } else if (
      path.node.openingElement &&
      path.node.openingElement.name &&
      path.node.openingElement.name.name === undefined
    ) {
      path.node.openingElement.name = styledComponentName;
      if (path.node.closingElement) {
        path.node.closingElement.name = styledComponentName;
      }
    } else {
      path.node.openingElement.name.name = styledComponentName;
      if (path.node.closingElement) {
        path.node.closingElement.name.name = styledComponentName;
      }
    }
  }

  /**
   * apply <StyledComponent />
   */
  if (rootJsxName === '') {
    root.find(j.JSXFragment).at(0).forEach(transformJsxRootToStyledComponent);
  } else if (rootJsxName.indexOf('.') > 0) {
    let converted = false;
    root.find(j.JSXElement).forEach((path) => {
      if (!converted && path.node.openingElement.name.type === 'JSXMemberExpression') {
        const tagName = `${path.node.openingElement.name.object.name}.${path.node.openingElement.name.property.name}`;
        if (tagName === rootJsxName) {
          converted = true;
          transformJsxRootToStyledComponent(path);
        }
      }
    });
  } else {
    root.findJSXElements(rootJsxName).at(0).forEach(transformJsxRootToStyledComponent);
  }

  /**
   * import styled if not exist
   */
  const imports = root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/^@material-ui\/core\/styles$/))
    .forEach(({ node }) => {
      const existed = node.specifiers.find((s) => s.imported.name === 'styled');
      if (!existed) {
        node.specifiers.push(j.importSpecifier(j.identifier('styled')));
      }
    });
  if (!imports.size()) {
    root
      .find(j.ImportDeclaration)
      .at(0)
      .forEach((path) =>
        path.insertAfter(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('styled'))],
            j.literal('@material-ui/core/styles'),
          ),
        ),
      );
  }

  /**
   * remove import
   */
  root
    .find(j.ImportDeclaration)
    .filter((path) =>
      path.node.source.value.match(
        /^@material-ui\/styles\/?(withStyles|makeStyles|createStyles)?$/,
      ),
    )
    .forEach((path) => {
      path.node.specifiers = path.node.specifiers.filter(
        (s) =>
          s.local.name !== 'withStyles' &&
          s.local.name !== 'makeStyles' &&
          s.local.name !== 'createStyles',
      );
    })
    .filter((path) => !path.node.specifiers.length)
    .remove();

  return root
    .toSource(printOptions)
    .replace(/withStyles\([^)]*\),?/gm, '')
    .replace(/([^=]{.*)classes[^.],?(.*})/gm, '$1$2')
    .replace(/^.*useStyles(.*);?/gm, '');
}
