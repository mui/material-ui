const ruleEndRegEx = /[^a-zA-Z0-9_]+/;

function transformNestedKeys(j, propValueNode, ruleRegEx, nestedKeys) {
  propValueNode.properties.forEach((prop) => {
    if (prop.value?.type === 'ObjectExpression') {
      if (typeof prop.key.value === 'string') {
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
      transformNestedKeys(j, prop.value, ruleRegEx, nestedKeys);
    }
  });
}
function transformStylesExpression(j, stylesExpression, nestedKeys, setStylesExpression) {
  const ruleNames = [];
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
    const ruleRegEx = new RegExp(ruleRegExString, 'g');
    objectExpression.properties.forEach((prop) => {
      if (prop.value) {
        transformNestedKeys(j, prop.value, ruleRegEx, nestedKeys);
      }
    });
    if (nestedKeys.length > 0) {
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
      arrowFunction.params.push(j.identifier('_params'));
      arrowFunction.params.push(j.identifier('classes'));
      if (arrowFunction.body.type === 'ObjectExpression') {
        // In some cases, some needed parentheses were being lost without this.
        arrowFunction.body = j.parenthesizedExpression(objectExpression);
      }
    }
  }
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
    } else if (importSource === '@material-ui/styles/makeStyles') {
      foundMakeStyles = true;
      path.replace(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('makeStyles'))],
          j.stringLiteral('tss-react/mui'),
        ),
      );
      importsChanged = true;
    } else if (importSource === '@material-ui/styles/withStyles') {
      foundWithStyles = true;
      path.replace(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('withStyles'))],
          j.stringLiteral('tss-react/mui'),
        ),
      );
      importsChanged = true;
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
    let clsxOrClassnamesName = null;
    root.find(j.ImportDeclaration).forEach((path) => {
      const importSource = path.node.source.value;
      if (importSource === 'clsx' || importSource === 'classnames') {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            clsxOrClassnamesName = specifier.local.name;
          }
        });
        j(path).remove();
      }
    });
    /**
     * Convert makeStyles syntax
     */
    const styleHooks = [];
    root
      .find(j.CallExpression, { callee: { name: 'makeStyles' } })
      .forEach((path) => {
        const nestedKeys = [];
        let options = null;
        if (path.node.arguments.length > 1) {
          options = path.node.arguments[1];
        }
        let stylesExpression = path.node.arguments[0];
        transformStylesExpression(j, path.node.arguments[0], nestedKeys, (newStylesExpression) => {
          stylesExpression = newStylesExpression;
        });
        let makeStylesIdentifier = 'makeStyles';
        if (isTypeScript && nestedKeys.length > 0) {
          const nestedKeysUnion = nestedKeys.join("' | '");
          makeStylesIdentifier += `<void, '${nestedKeysUnion}'>`;
        }
        j(path).replaceWith(
          j.callExpression(
            j.callExpression(j.identifier(makeStylesIdentifier), options === null ? [] : [options]),
            [stylesExpression],
          ),
        );
      })
      .closest(j.VariableDeclarator)
      .forEach((path) => {
        styleHooks.push(path.node.id.name);
      });
    /**
     * Convert classes assignment syntax in calls to the hook (e.g. useStyles) and
     * convert usages of clsx or classnames to cx.
     */
    styleHooks.forEach((hookName) => {
      root
        .find(j.CallExpression, { callee: { name: hookName } })
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
          transformStylesExpression(j, styles, nestedKeys, (newStylesExpression) => {
            path.node.callee.arguments[0] = newStylesExpression;
          });
        }
        const component = path.node.arguments[0];
        withStylesCall.arguments.unshift(component);
        return withStylesCall;
      });
    styleVariables.forEach((styleVar) => {
      root.find(j.VariableDeclarator, { id: { name: styleVar } }).forEach((path) => {
        const nestedKeys = [];
        transformStylesExpression(j, path.node.init, nestedKeys, (newStylesExpression) => {
          path.node.init = newStylesExpression;
        });
      });
    });
  }
  return root.toSource(printOptions);
}
