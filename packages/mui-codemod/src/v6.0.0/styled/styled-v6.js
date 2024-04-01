/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function styledV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  /**
   *
   * @param {import('ast-types').namedTypes.MemberExpression | import('ast-types').namedTypes.Identifier} node
   */
  function getIdentifierKey(node) {
    if (node.type === 'MemberExpression') {
      return node.property;
    }
    return node;
  }

  /**
   *
   * @param {import('ast-types').namedTypes.ObjectExpression} objectExpression
   * @param {import('ast-types').namedTypes.BinaryExpression} addtional
   */
  function objectToArrowFunction(objectExpression, addtional) {
    /**
     *
     * @param {import('ast-types').namedTypes.MemberExpression | import('ast-types').namedTypes.Identifier} node
     */
    function getObjectKey(node) {
      if (node.type === 'MemberExpression') {
        return node.object;
      }
      return node;
    }
    const paramKeys = new Set();
    let left;
    objectExpression.properties.forEach((prop, index) => {
      paramKeys.add(prop.key.name);
      const result = j.binaryExpression('===', prop.key, prop.value);
      if (index === 0) {
        left = result;
      } else {
        left = j.logicalExpression('&&', left, result);
      }
    });
    if (addtional) {
      paramKeys.add(getObjectKey(addtional.left).name);
    }
    return j.arrowFunctionExpression(
      [
        j.objectPattern(
          [...paramKeys].map((k) => {
            const item = j.objectProperty(j.identifier(k), j.identifier(k));
            item.shorthand = true;
            return item;
          }),
        ),
      ],
      addtional ? j.logicalExpression('&&', left, addtional) : left,
    );
  }

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
      let objectExpression = style.body;
      while (objectExpression.type !== 'ObjectExpression') {
        if (objectExpression.type === 'BlockStatement') {
          objectExpression = objectExpression.body.find(
            (item) => item.type === 'ReturnStatement',
          ).argument;
        }
      }
      // Only expression with '===' operator
      objectExpression.properties.forEach((prop, index) => {
        // handle case: equal expression and boolean
        // like `ownerState.size === 'small'` and `ownerState.contained`
        if (prop.type === 'SpreadElement') {
          const properties = [];
          let node = prop.argument;
          while (node.left) {
            if (node.operator !== '&&') {
              break;
            }
            if (node.left.type === 'BinaryExpression' && node.left.operator === '===') {
              properties.push(j.objectProperty(getIdentifierKey(node.left.left), node.left.right));
              break;
            }
            if (node.left.type === 'MemberExpression' || node.left.type === 'Identifier') {
              properties.push(
                j.objectProperty(getIdentifierKey(node.left), j.booleanLiteral(true)),
              );
              break;
            }
            if (node.left.type === 'UnaryExpression') {
              properties.push(
                j.objectProperty(getIdentifierKey(node.left.argument), j.booleanLiteral(false)),
              );
              break;
            }
            node = node.left;
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

      objectExpression.properties = objectExpression.properties.filter(
        (_, index) => !removingIndexes.includes(index),
      );
      objectExpression.properties.push(
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
