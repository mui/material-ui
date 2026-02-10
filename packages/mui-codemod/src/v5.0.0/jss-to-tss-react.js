const ruleEndRegEx = /[^a-zA-Z0-9_]+/;

function transformNestedKeys(j, comments, propValueNode, ruleRegEx, nestedKeys) {
  propValueNode.properties.forEach((prop) => {
    if (prop.value?.type === 'ObjectExpression') {
      if (typeof prop.key.value === 'string' && ruleRegEx !== null) {
        let ruleIndex = prop.key.value.search(ruleRegEx);
        let searchStartIndex = 0;
        const elements = [];
        const identifiers = [];
        while (ruleIndex >= 0) {
          const valueStartingAtRuleName = prop.key.value.substring(ruleIndex + 1);
          const ruleEndIndex = valueStartingAtRuleName.search(ruleEndRegEx);
          const ruleName =
            ruleEndIndex >= 0
              ? prop.key.value.substring(ruleIndex + 1, ruleIndex + 1 + ruleEndIndex)
              : valueStartingAtRuleName;
          if (!nestedKeys.includes(ruleName)) {
            nestedKeys.push(ruleName);
          }
          const before = prop.key.value.substring(searchStartIndex, ruleIndex);
          elements.push(j.templateElement({ raw: `${before}.`, cooked: `${before}.` }, false));
          identifiers.push(j.identifier(`classes.${ruleName}`));
          searchStartIndex = ruleIndex + ruleName.length + 1;
          const after = prop.key.value.substring(searchStartIndex);
          ruleIndex = after.search(ruleRegEx);
          if (ruleIndex >= 0) {
            ruleIndex += searchStartIndex;
          } else {
            elements.push(j.templateElement({ raw: after, cooked: after }, false));
          }
        }
        if (identifiers.length > 0) {
          prop.key = j.templateLiteral(elements, identifiers);
          prop.computed = true;
        }
      }
      transformNestedKeys(j, comments, prop.value, ruleRegEx, nestedKeys);
    } else if (prop.value?.type === 'ArrowFunctionExpression') {
      comments.push(
        j.commentLine(
          ' TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.',
          true,
        ),
      );
    }
  });
}
function transformStylesExpression(j, comments, stylesExpression, nestedKeys, setStylesExpression) {
  const ruleNames = [];
  const paramNames = [];
  let objectExpression;
  if (stylesExpression.type === 'ObjectExpression') {
    objectExpression = stylesExpression;
  } else if (stylesExpression.type === 'ArrowFunctionExpression') {
    if (stylesExpression.body.type === 'BlockStatement') {
      const returnStatement = stylesExpression.body.body.find((b) => b.type === 'ReturnStatement');
      if (returnStatement.argument.type === 'ObjectExpression') {
        objectExpression = returnStatement.argument;
      }
    } else if (stylesExpression.body.type === 'ObjectExpression') {
      objectExpression = stylesExpression.body;
    }
  }
  if (objectExpression !== undefined) {
    objectExpression.properties.forEach((prop) => {
      if (prop.key?.name) {
        ruleNames.push(prop.key.name);
      } else if (prop.key?.value === '@global') {
        comments.push(
          j.commentLine(
            ` TODO jss-to-tss-react codemod: '@global' is not supported by tss-react.`,
            true,
          ),
        );
        comments.push(
          j.commentLine(
            ` See https://mui.com/material-ui/customization/how-to-customize/#4-global-css-override for alternatives.`,
            true,
          ),
        );
      }
    });
    let ruleRegExString = '(';
    ruleNames.forEach((ruleName, index) => {
      if (index > 0) {
        ruleRegExString += '|';
      }
      ruleRegExString += `\\$${ruleName}`;
    });
    ruleRegExString += ')';
    const ruleRegEx = ruleNames.length === 0 ? null : new RegExp(ruleRegExString, 'g');
    objectExpression.properties.forEach((prop) => {
      if (prop.value) {
        if (prop.value.type !== 'ObjectExpression') {
          if (
            prop.value.type === 'ArrowFunctionExpression' &&
            prop.value.body.type === 'ObjectExpression' &&
            prop.value.params[0].type === 'ObjectPattern'
          ) {
            prop.value.params[0].properties.forEach((property) => {
              const name = property.key.name;
              if (!paramNames.includes(name)) {
                paramNames.push(name);
              }
            });
            prop.value = prop.value.body;
          } else {
            let extraComment = `Unexpected value type of ${prop.value.type}.`;
            if (prop.value.type === 'ArrowFunctionExpression') {
              if (prop.value.body.type === 'ObjectExpression') {
                let example = '';
                if (prop.value.params[0].type === 'Identifier') {
                  example = ' (for example `(props) => ({...})` instead of `({color}) => ({...})`)';
                }
                extraComment = ` Arrow function has parameter type of ${prop.value.params[0].type} instead of ObjectPattern${example}.`;
              } else {
                extraComment = ` Arrow function has body type of ${prop.value.body.type} instead of ObjectExpression.`;
              }
            }
            comments.push(
              j.commentLine(
                ` TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.`,
                true,
              ),
            );
            comments.push(j.commentLine(extraComment, true));
            return;
          }
        }
        transformNestedKeys(j, comments, prop.value, ruleRegEx, nestedKeys);
      }
    });
    if (paramNames.length > 0 || nestedKeys.length > 0) {
      let arrowFunction;
      if (stylesExpression.type === 'ArrowFunctionExpression') {
        arrowFunction = stylesExpression;
      } else {
        arrowFunction = j.arrowFunctionExpression([], objectExpression);
        setStylesExpression(arrowFunction);
      }
      if (arrowFunction.params.length === 0) {
        arrowFunction.params.push(j.identifier('_theme'));
      }
      let paramsString = '_params';
      if (paramNames.length > 0) {
        paramsString = `{ ${paramNames.join(', ')} }`;
      }
      arrowFunction.params.push(j.identifier(paramsString));
      if (nestedKeys.length > 0) {
        arrowFunction.params.push(j.identifier('classes'));
      }
      if (arrowFunction.body.type === 'ObjectExpression') {
        // In some cases, some needed parentheses were being lost without this.
        arrowFunction.body = j.parenthesizedExpression(objectExpression);
      }
    }
  }
}
function addCommentsToNode(node, commentsToAdd, addToBeginning = false) {
  if (!node.comments) {
    node.comments = [];
  }
  if (addToBeginning) {
    node.comments.unshift(...commentsToAdd);
  } else {
    node.comments.push(...commentsToAdd);
  }
}
function addCommentsToDeclaration(declaration, commentsToAdd) {
  let commentsPath = declaration;
  if (declaration.parentPath.node.type === 'ExportNamedDeclaration') {
    commentsPath = declaration.parentPath;
  }
  addCommentsToNode(commentsPath.node, commentsToAdd);
}
function addCommentsToClosestDeclaration(j, path, commentsToAdd) {
  j(path)
    .closest(j.VariableDeclaration)
    .forEach((declaration) => {
      addCommentsToDeclaration(declaration, commentsToAdd);
    });
}
function getFirstNode(j, root) {
  return root.find(j.Program).get('body', 0).node;
}
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };
  const originalFirstNode = getFirstNode(j, root);
  let importsChanged = false;
  let foundCreateStyles = false;
  let foundMakeStyles = false;
  let foundWithStyles = false;
  /**
   * transform imports
   */
  root.find(j.ImportDeclaration).forEach((path) => {
    const importSource = path.node.source.value;
    const originalComments = path.node.comments;
    if (
      importSource === '@material-ui/core/styles' ||
      importSource === '@material-ui/core' ||
      importSource === '@mui/styles'
    ) {
      const specifiersToMove = [];
      const specifiersToStay = [];
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          if (specifier.imported.name === 'makeStyles') {
            foundMakeStyles = true;
            specifiersToMove.push(specifier);
          } else if (specifier.imported.name === 'withStyles') {
            foundWithStyles = true;
            specifiersToMove.push(specifier);
          } else if (specifier.imported.name === 'createStyles') {
            foundCreateStyles = true;
          } else {
            specifiersToStay.push(specifier);
          }
        }
      });

      if (specifiersToMove.length > 0) {
        path.replace(
          j.importDeclaration(specifiersToMove, j.stringLiteral('tss-react/mui')),
          specifiersToStay.length > 0
            ? j.importDeclaration(specifiersToStay, j.stringLiteral(importSource))
            : undefined,
        );
        importsChanged = true;
      }
    } else if (
      importSource === '@material-ui/styles/makeStyles' ||
      importSource === '@mui/styles/makeStyles'
    ) {
      foundMakeStyles = true;
      path.replace(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('makeStyles'))],
          j.stringLiteral('tss-react/mui'),
        ),
      );
      importsChanged = true;
    } else if (
      importSource === '@material-ui/styles/withStyles' ||
      importSource === '@mui/styles/withStyles'
    ) {
      foundWithStyles = true;
      path.replace(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('withStyles'))],
          j.stringLiteral('tss-react/mui'),
        ),
      );
      importsChanged = true;
    }
    path.node.comments = originalComments;
  });
  if (!importsChanged) {
    return file.source;
  }
  const isTypeScript = file.path.endsWith('.tsx') || file.path.endsWith('.ts');
  if (foundMakeStyles) {
    let clsxOrClassnamesName = null;
    root.find(j.ImportDeclaration).forEach((path) => {
      const importSource = path.node.source.value;
      if (importSource === 'clsx' || importSource === 'classnames') {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            clsxOrClassnamesName = specifier.local.name;
          }
        });
        let commentsToPreserve = null;
        if (originalFirstNode === path.node) {
          // For a removed import, only preserve the comments if it is the first node in the file,
          // otherwise the comments are probably about the removed import and no longer relevant.
          commentsToPreserve = path.node.comments;
        }
        j(path).remove();
        if (commentsToPreserve) {
          addCommentsToNode(getFirstNode(j, root), commentsToPreserve, true);
        }
      }
    });
    /**
     * Convert makeStyles syntax
     */
    const styleHooks = [];
    root
      .find(j.CallExpression, { callee: { name: 'makeStyles' } })
      .forEach((path) => {
        let paramsTypes = null;
        if (foundCreateStyles) {
          j(path)
            .find(j.CallExpression, { callee: { name: 'createStyles' } })
            .replaceWith((createStylesPath) => {
              if (
                isTypeScript &&
                createStylesPath.node.typeParameters &&
                createStylesPath.node.typeParameters.params.length > 1
              ) {
                paramsTypes = createStylesPath.node.typeParameters.params[1];
              }
              return createStylesPath.node.arguments[0];
            });
        }
        const nestedKeys = [];
        let makeStylesOptions = null;
        if (path.node.arguments.length > 1) {
          makeStylesOptions = path.node.arguments[1];
        }
        let stylesExpression = path.node.arguments[0];
        const commentsToAdd = [];
        transformStylesExpression(
          j,
          commentsToAdd,
          path.node.arguments[0],
          nestedKeys,
          (newStylesExpression) => {
            stylesExpression = newStylesExpression;
          },
        );
        addCommentsToClosestDeclaration(j, path, commentsToAdd);
        let makeStylesIdentifier = 'makeStyles';
        if (isTypeScript && (nestedKeys.length > 0 || paramsTypes !== null)) {
          let paramsTypeString = 'void';
          if (paramsTypes !== null) {
            paramsTypeString = j(paramsTypes).toSource(printOptions);
          }
          let nestedKeysString = '';
          if (nestedKeys.length > 0) {
            const nestedKeysUnion = nestedKeys.join("' | '");
            nestedKeysString = `, '${nestedKeysUnion}'`;
          }
          makeStylesIdentifier += `<${paramsTypeString}${nestedKeysString}>`;
        }
        j(path).replaceWith(
          j.callExpression(
            j.callExpression(
              j.identifier(makeStylesIdentifier),
              makeStylesOptions === null ? [] : [makeStylesOptions],
            ),
            [stylesExpression],
          ),
        );
      })
      .closest(j.VariableDeclarator)
      .forEach((path) => {
        styleHooks.push(path.node.id.name);
        j(path)
          .closest(j.ExportNamedDeclaration)
          .forEach(() => {
            const comments = [
              j.commentLine(
                ` TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.`,
                true,
              ),
            ];
            addCommentsToClosestDeclaration(j, path, comments);
          });
      });
    /**
     * Convert classes assignment syntax in calls to the hook (for example useStyles) and
     * convert usages of clsx or classnames to cx.
     */
    styleHooks.forEach((hookName) => {
      root
        .find(j.CallExpression, { callee: { name: hookName } })
        .forEach((hookCall) => {
          if (hookCall.node.arguments.length === 1) {
            const hookArg = hookCall.node.arguments[0];
            if (hookArg.type === 'Identifier') {
              const secondArg = j.objectExpression([]);
              secondArg.properties.push(
                j.objectProperty(j.identifier('props'), j.identifier(hookArg.name)),
              );
              hookCall.node.arguments.push(secondArg);
            } else if (hookArg.properties) {
              const hookArgPropsMinusClasses = [];
              let classesProp = null;
              hookArg.properties.forEach((hookProp) => {
                if (hookProp.key.name === 'classes') {
                  classesProp = hookProp;
                } else {
                  hookArgPropsMinusClasses.push(hookProp);
                }
              });
              if (classesProp !== null) {
                if (hookArgPropsMinusClasses.length === 0) {
                  hookCall.node.arguments[0] = j.identifier('undefined');
                } else {
                  hookArg.properties = hookArgPropsMinusClasses;
                }
                const secondArg = j.objectExpression([]);
                secondArg.properties.push(
                  j.objectProperty(
                    j.identifier('props'),
                    j.objectExpression([
                      j.objectProperty(j.identifier('classes'), classesProp.value),
                    ]),
                  ),
                );
                hookCall.node.arguments.push(secondArg);
              }
            }
          }
        })
        .closest(j.VariableDeclarator)
        .forEach((path) => {
          let foundClsxOrClassnamesUsage = false;
          const classesName = path.node.id.name;
          const classesAssign = classesName === 'classes' ? 'classes' : `classes: ${classesName}`;
          if (clsxOrClassnamesName !== null) {
            j(path)
              .closestScope()
              .find(j.CallExpression, { callee: { name: clsxOrClassnamesName } })
              .forEach((callPath) => {
                callPath.node.callee.name = 'cx';
                foundClsxOrClassnamesUsage = true;
              });
          }
          if (foundClsxOrClassnamesUsage) {
            path.node.id.name = `{ ${classesAssign}, cx }`;
          } else {
            path.node.id.name = `{ ${classesAssign} }`;
          }
        });
      root.find(j.ExportDefaultDeclaration, { declaration: { name: hookName } }).forEach((path) => {
        const comments = [
          j.commentLine(
            ` TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.`,
            true,
          ),
        ];
        addCommentsToDeclaration(path, comments);
      });
    });
  }
  if (foundWithStyles) {
    /**
     * Convert withStyles syntax
     */
    const styleVariables = [];
    root
      .find(j.CallExpression, {
        callee: { type: 'CallExpression', callee: { name: 'withStyles' } },
      })
      .replaceWith((path) => {
        const withStylesCall = path.node.callee;
        const styles = path.node.callee.arguments[0];
        if (styles.type === 'Identifier') {
          styleVariables.push(styles.name);
        } else {
          const nestedKeys = [];
          const commentsToAdd = [];
          transformStylesExpression(j, commentsToAdd, styles, nestedKeys, (newStylesExpression) => {
            path.node.callee.arguments[0] = newStylesExpression;
          });
          addCommentsToClosestDeclaration(j, path, commentsToAdd);
        }
        const component = path.node.arguments[0];
        withStylesCall.arguments.unshift(component);
        return withStylesCall;
      });
    styleVariables.forEach((styleVar) => {
      root.find(j.VariableDeclarator, { id: { name: styleVar } }).forEach((path) => {
        const nestedKeys = [];
        const commentsToAdd = [];
        transformStylesExpression(
          j,
          commentsToAdd,
          path.node.init,
          nestedKeys,
          (newStylesExpression) => {
            path.node.init = newStylesExpression;
          },
        );
        addCommentsToClosestDeclaration(j, path, commentsToAdd);
      });
    });
  }
  return root.toSource(printOptions);
}
