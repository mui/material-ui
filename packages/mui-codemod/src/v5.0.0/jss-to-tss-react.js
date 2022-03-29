function transformNestedKeys(j, propValueNode, ruleNames, nestedKeys) {
  propValueNode.properties.forEach((prop) => {
    if (prop.value.type === 'ObjectExpression') {
      ruleNames.forEach((ruleName) => {
        if (typeof prop.key.value === 'string') {
          const ruleRegEx = new RegExp(`(\\$${ruleName}$|\\$${ruleName}[^a-zA-Z0-9_]+)`);
          const ruleIndex = prop.key.value.search(ruleRegEx);
          if (ruleIndex >= 0) {
            if (!nestedKeys.includes(ruleName)) {
              nestedKeys.push(ruleName);
            }
            const before = prop.key.value.substring(0, ruleIndex);
            const after = prop.key.value.substring(ruleIndex + ruleName.length + 1);
            prop.key = j.templateLiteral(
              [
                j.templateElement({ raw: `${before}.`, cooked: `${before}.` }, false),
                j.templateElement({ raw: after, cooked: after }, true),
              ],
              [j.identifier(`classes.${ruleName}`)],
            );
            prop.computed = true;
          }
        }
      });
      transformNestedKeys(j, prop.value, ruleNames, nestedKeys);
    }
  });
}
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  let importsChanged = false;
  let foundCreateStyles = false;
  let foundMakeStyles = false;
  let foundWithStyles = false;
  /**
   * transform imports
   */
  root.find(j.ImportDeclaration).forEach((path) => {
    const importSource = path.node.source.value;
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
    }
  });
  if (!importsChanged) {
    return file.source;
  }
  const isTypeScript = file.path.endsWith('.tsx') || file.path.endsWith('.ts');
  /**
   * Remove usages of createStyles
   */
  if (foundCreateStyles) {
    root.find(j.CallExpression, { callee: { name: 'createStyles' } }).replaceWith((path) => {
      return path.node.arguments[0];
    });
  }
  if (foundMakeStyles) {
    /**
     * Convert makeStyles syntax
     */
    const styleHooks = [];
    root
      .find(j.CallExpression, { callee: { name: 'makeStyles' } })
      .forEach((path) => {
        const makeStylesArg = path.node.arguments[0];
        const ruleNames = [];
        const nestedKeys = [];
        let objectExpression;
        if (makeStylesArg.type === 'ObjectExpression') {
          objectExpression = makeStylesArg;
        } else if (makeStylesArg.type === 'ArrowFunctionExpression') {
          if (makeStylesArg.body.type === 'BlockStatement') {
            const returnStatement = makeStylesArg.body.body.find(
              (b) => b.type === 'ReturnStatement',
            );
            objectExpression = returnStatement.argument;
          } else if (makeStylesArg.body.type === 'ObjectExpression') {
            objectExpression = makeStylesArg.body;
          }
        }
        if (objectExpression !== undefined) {
          objectExpression.properties.forEach((prop) => {
            ruleNames.push(prop.key.name);
          });
          objectExpression.properties.forEach((prop) => {
            transformNestedKeys(j, prop.value, ruleNames, nestedKeys);
          });
          if (nestedKeys.length > 0) {
            let arrowFunction;
            if (makeStylesArg.type === 'ArrowFunctionExpression') {
              arrowFunction = makeStylesArg;
            } else {
              arrowFunction = j.arrowFunctionExpression([], objectExpression);
              path.node.arguments[0] = arrowFunction;
            }
            if (arrowFunction.params.length === 0) {
              arrowFunction.params.push(j.identifier('_theme'));
            }
            arrowFunction.params.push(j.identifier('_params'));
            arrowFunction.params.push(j.identifier('classes'));
            if (arrowFunction.body.type === 'ObjectExpression') {
              // In some cases, some needed parentheses were being lost without this.
              arrowFunction.body = j.parenthesizedExpression(objectExpression);
            }
          }
        }
        if (isTypeScript && nestedKeys.length > 0) {
          const nestedKeysUnion = nestedKeys.join('" | "');
          path.node.callee.name = `makeStyles<void, "${nestedKeysUnion}">()`;
        } else {
          path.node.callee.name = 'makeStyles()';
        }
      })
      .closest(j.VariableDeclarator)
      .forEach((path) => {
        styleHooks.push(path.node.id.name);
      });
    /**
     * Convert classes assignment syntax in calls to the hook (e.g. useStyles)
     */
    styleHooks.forEach((hookName) => {
      root
        .find(j.CallExpression, { callee: { name: hookName } })
        .closest(j.VariableDeclarator)
        .forEach((path) => {
          path.node.id.name = '{ classes }';
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
        }
        const component = path.node.arguments[0];
        withStylesCall.arguments.unshift(component);
        return withStylesCall;
      });
  }
  return root.toSource(printOptions);
}
