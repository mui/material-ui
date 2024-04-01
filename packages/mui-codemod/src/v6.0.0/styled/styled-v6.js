/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function styledV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root.find(j.CallExpression).forEach((path) => {
    const styles = [];

    // 1. collecting styles that should be tranformed
    if (
      path.node.callee.type === 'Identifier' &&
      path.node.callee.name === 'styled' &&
      path.parentPath.node.type === 'CallExpression'
    ) {
      path.parentPath.node.arguments.forEach((arg) => {
        if (
          arg.type === 'ArrowFunctionExpression' &&
          arg.params[0] &&
          arg.params[0].properties.some((prop) => prop.key.name !== 'theme')
        ) {
          styles.push(arg);
        }
      });
    }

    // 2. Find logical spread expressions to convert to variants
    styles.forEach((style) => {
      const variants = [];

      const removingIndexes = [];
      // Only expression with '===' operator
      style.body.properties.forEach((prop, index) => {
        // handle case: equal expression and boolean
        // like `ownerState.size === 'small'` and `ownerState.contained`
        if (prop.type === 'SpreadElement') {
          const properties = [];
          let node = prop.argument;
          while (node.left) {
            if (node.operator !== '&&') {
              break;
            }
            const left = node.left;

            // handle case: `prop === 'small' &&`
            if (left.type === 'BinaryExpression' && left.operator === '===') {
              if (left.left.type === 'Identifier') {
                properties.push(j.objectProperty(left.left, left.right));
                break;
              }
              if (left.left.type === 'MemberExpression') {
                properties.push(j.objectProperty(left.left.property, left.right));
                break;
              }
            }

            // handle case: `prop &&`
            if (left.type === 'MemberExpression') {
              properties.push(j.objectProperty(left.property, j.booleanLiteral(true)));
              break;
            }
            if (left.type === 'Identifier') {
              properties.push(j.objectProperty(left, j.booleanLiteral(true)));
              break;
            }

            // handle case: `!prop &&`
            if (left.type === 'UnaryExpression' && left.operator === '!') {
              if (left.argument.type === 'Identifier') {
                properties.push(j.objectProperty(left.argument, j.booleanLiteral(false)));
                break;
              }
              if (left.argument.type === 'MemberExpression') {
                properties.push(j.objectProperty(left.argument.property, j.booleanLiteral(false)));
                break;
              }
            }
            node = left;
          }
          if (properties.length) {
            removingIndexes.push(index);
            variants.push(
              j.objectExpression([
                j.objectProperty(j.identifier('props'), j.objectExpression(properties)),
                j.objectProperty(j.identifier('style'), prop.argument.right),
              ]),
            );
          }
        }
      });

      style.body.properties = style.body.properties.filter(
        (_, index) => !removingIndexes.includes(index),
      );
      style.body.properties.push(
        j.objectProperty(j.identifier('variants'), j.arrayExpression(variants)),
      );

      style.params.forEach((param) => {
        if (param.type === 'ObjectPattern') {
          param.properties = param.properties.filter((prop) => prop.key.name === 'theme');
        }
      });
    });
  });

  return root.toSource(printOptions);
}
