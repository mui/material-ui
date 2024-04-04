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
   * @param {import('ast-types').namedTypes.MemberExpression | import('ast-types').namedTypes.Identifier} node
   */
  function getObjectKey(node) {
    if (node.type === 'MemberExpression') {
      return node.object;
    }
    return node;
  }

  /**
   *
   * @param {import('ast-types').namedTypes.ObjectExpression} objectExpression
   * @param {import('ast-types').namedTypes.BinaryExpression} addtional
   */
  function objectToArrowFunction(objectExpression, addtional) {
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

  /**
   *
   * @param {import('ast-types').namedTypes.BinaryExpression} node
   */
  function inverseBinaryExpression(node) {
    if (node.operator === '===') {
      return { ...node, operator: '!==' };
    }
    if (node.operator === '!==') {
      return { ...node, operator: '===' };
    }
    return node;
  }

  function removeProperty(objectExpression, child) {
    if (objectExpression) {
      objectExpression.properties = objectExpression.properties.filter(
        (prop) => prop !== child && prop.value !== child,
      );
    }
  }

  function buildObjectAST(jsObject) {
    const result = j.objectExpression([]);
    Object.entries(jsObject).forEach(([key, value]) => {
      result.properties.push(j.objectProperty(j.identifier(key), value));
    });
    return result;
  }

  /**
   *
   * @param {import('ast-types').namedTypes.LogicalExpression} node
   */
  function buildProps(node) {
    const properties = [];
    const variables = new Set();
    let isAllEqual = true;
    let tempNode = { ...node };
    function assignProperties(_node) {
      if (_node.type === 'BinaryExpression') {
        variables.add(getObjectKey(_node.left).name);
        if (_node.operator === '===') {
          properties.push(j.objectProperty(getIdentifierKey(_node.left), _node.right));
        } else {
          isAllEqual = false;
        }
      }
      if (_node.type === 'MemberExpression' || _node.type === 'Identifier') {
        isAllEqual = false;
        variables.add(getObjectKey(_node).name);
      }
      if (_node.type === 'UnaryExpression') {
        isAllEqual = false;
        if (_node.argument.type === 'UnaryExpression') {
          // handle `!!variable`
          variables.add(getObjectKey(_node.argument.argument).name);
        } else {
          // handle `!variable`
          variables.add(getObjectKey(_node.argument).name);
        }
      }
    }
    if (tempNode.type !== 'LogicalExpression') {
      assignProperties(tempNode);
    } else {
      while (tempNode.type === 'LogicalExpression') {
        if (tempNode.operator !== '&&') {
          isAllEqual = false;
        }

        assignProperties(tempNode.right);
        if (tempNode.left.type !== 'LogicalExpression') {
          assignProperties(tempNode.left);
          break;
        }

        tempNode = { ...tempNode.left };
      }
    }

    if (!isAllEqual) {
      return j.arrowFunctionExpression(
        [
          j.objectPattern(
            [...variables].map((k) => ({
              ...j.objectProperty(j.identifier(k), j.identifier(k)),
              shorthand: true,
            })),
          ),
        ],
        node,
      );
    }
    return j.objectExpression(properties);
  }

  function mergeProps(parentProps, currentProps) {
    if (parentProps.type === 'ObjectExpression' && currentProps.type === 'ObjectExpression') {
      return j.objectExpression([...parentProps.properties, ...currentProps.properties]);
    }
    const parentArrow =
      parentProps.type === 'ObjectExpression' ? objectToArrowFunction(parentProps) : parentProps;
    const currentArrow =
      currentProps.type === 'ObjectExpression' ? objectToArrowFunction(currentProps) : currentProps;
    const variables = new Set();
    [...parentArrow.params[0].properties, ...currentArrow.params[0].properties].forEach((param) => {
      variables.add(param.key.name);
    });
    return j.arrowFunctionExpression(
      [
        j.objectPattern(
          [...variables].map((k) => ({
            ...j.objectProperty(j.identifier(k), j.identifier(k)),
            shorthand: true,
          })),
        ),
      ],
      j.logicalExpression('&&', parentArrow.body, currentArrow.body),
    );
  }

  root.find(j.CallExpression).forEach((path) => {
    const styles = [];
    let args = [];

    // styled('div')(...arguments)
    if (
      path.node.callee.type === 'Identifier' &&
      path.node.callee.name === 'styled' &&
      path.parentPath.node.type === 'CallExpression'
    ) {
      args = path.parentPath.node.arguments;
    }

    // styled.div(...arguments)
    if (
      path.node.callee.type === 'MemberExpression' &&
      path.node.callee.object.type === 'Identifier' &&
      path.node.callee.object.name === 'styled'
    ) {
      args = path.node.arguments;
    }

    // 1. collecting styles that should be tranformed
    args.forEach((arg) => {
      if (
        arg.type === 'ArrowFunctionExpression' &&
        arg.params[0] &&
        arg.params[0].type === 'ObjectPattern' &&
        arg.params[0].properties.some((prop) => prop.key.name !== 'theme')
      ) {
        styles.push(arg);
      }
    });

    // 2. Find logical spread expressions to convert to variants
    styles.forEach((style) => {
      const parameters = new Set();
      style.params.forEach((param) => {
        if (param.type === 'ObjectPattern') {
          param.properties.forEach((prop) => {
            parameters.add(prop.key.name);
          });
        }
      });
      const variants = [];

      if (style.body.type === 'LogicalExpression') {
        if (
          style.params[0] &&
          style.params[0].type === 'ObjectPattern' &&
          style.params[0].properties.some((prop) => prop.key.name !== 'theme')
        ) {
          // case: ({ theme, ownerState }) => ownerState.variant === 'regular' && theme.mixins.toolbar
          style.body = j.objectExpression([
            j.objectProperty(
              j.identifier('variants'),
              j.arrayExpression([
                j.objectExpression([
                  j.objectProperty(j.identifier('props'), buildProps(style.body.left)),
                  j.objectProperty(j.identifier('style'), style.body.right),
                ]),
              ]),
            ),
          ]);
        }
      } else if (style.body.type === 'ConditionalExpression') {
        // skip ConditionalExpression
      } else {
        let objectExpression = style.body;
        while (objectExpression.type !== 'ObjectExpression') {
          if (objectExpression.type === 'BlockStatement') {
            objectExpression = objectExpression.body.find(
              (item) => item.type === 'ReturnStatement',
            ).argument;
          }
        }

        recurseObjectExpression({ node: objectExpression });

        objectExpression.properties.push(
          j.objectProperty(
            j.identifier('variants'),
            j.arrayExpression(
              variants.filter((variant) => {
                const props = variant.properties.find((prop) => prop.key.name === 'props');
                const styleVal = variant.properties.find((prop) => prop.key.name === 'style');
                return (
                  props &&
                  styleVal &&
                  styleVal.value.properties.length > 0 &&
                  (props.value.type === 'ArrowFunctionExpression' ||
                    props.value.properties.length > 0)
                );
              }),
            ),
          ),
        );
      }

      function recurseObjectExpression(data) {
        if (data.node.type === 'ObjectExpression') {
          data.node.properties.forEach((prop) => {
            if (prop.type === 'ObjectProperty') {
              recurseObjectExpression({ node: prop.value, parentNode: data.node, key: prop.key });
            } else {
              recurseObjectExpression({ node: prop, parentNode: data.node });
            }
          });
        }
        if (data.node.type === 'SpreadElement' && data.node.argument.type === 'LogicalExpression') {
          const paramName = getObjectKey(data.node.argument.left)?.name;
          if (paramName && !parameters.has(paramName)) {
            return;
          }

          const scopeProps = buildProps(data.node.argument.left);
          const variant = {
            props: data.props ? mergeProps(data.props, scopeProps) : scopeProps,
            style: data.node.argument.right,
          };

          variant.style.properties.forEach((prop) => {
            if (prop.type === 'ObjectProperty') {
              recurseObjectExpression({
                node: prop.value,
                parentNode: variant.style,
                props: variant.props,
                key: prop.key,
              });
            } else {
              recurseObjectExpression({
                node: prop,
                parentNode: variant.style,
                props: variant.props,
              });
            }
          });
          variants.push(buildObjectAST(variant));
          removeProperty(data.parentNode, data.node);
        }
        if (
          data.node.type === 'ConditionalExpression' &&
          data.node.test.type === 'BinaryExpression'
        ) {
          if (getIdentifierKey(data.node.test.left).name !== 'theme') {
            if (data.key && data.key.type === 'Identifier') {
              const props = objectToArrowFunction(data.props, data.node.test);
              const styleVal = data.node.consequent;
              const variant = {
                props,
                style: j.objectExpression([j.objectProperty(data.key, styleVal)]),
              };
              variants.push(buildObjectAST(variant));

              // create another variant with inverted condition
              const props2 = objectToArrowFunction(
                data.props,
                inverseBinaryExpression(data.node.test),
              );
              const styleVal2 = data.node.alternate;
              const variant2 = {
                props: props2,
                style: j.objectExpression([j.objectProperty(data.key, styleVal2)]),
              };
              variants.push(buildObjectAST(variant2));
            }
          }
          removeProperty(data.parentNode, data.node);
        }
        if (
          data.key &&
          data.key.type === 'Identifier' &&
          data.node.type === 'MemberExpression' &&
          data.node.object.type === 'ObjectExpression' &&
          parameters.has(getObjectKey(data.node.property).name)
        ) {
          data.node.object.properties.forEach((prop) => {
            variants.push(
              buildObjectAST({
                props: j.objectExpression([
                  j.objectProperty(
                    getIdentifierKey(data.node.property),
                    j.stringLiteral(prop.key.name),
                  ),
                ]),
                style: j.objectExpression([j.objectProperty(data.key, prop.value)]),
              }),
            );
          });
          removeProperty(data.parentNode, data.node);
        }
      }

      style.params.forEach((param) => {
        if (param.type === 'ObjectPattern') {
          param.properties = param.properties.filter((prop) => prop.key.name === 'theme');
        }
      });
    });

    // Replace arrow function with object expression if the arg properties is empty
    args.forEach((arg, index) => {
      if (
        arg.type === 'ArrowFunctionExpression' &&
        arg.params[0] &&
        arg.params[0].type === 'ObjectPattern' &&
        arg.params[0].properties.length === 0
      ) {
        if (arg.body.type === 'ObjectExpression') {
          args[index] = arg.body;
        }
        if (arg.body.type === 'BlockStatement') {
          const returnStatement = arg.body.body.find((item) => item.type === 'ReturnStatement');
          if (returnStatement) {
            args[index] = returnStatement.argument;
          }
        }
      }
    });
  });

  const transformed = root.toSource(printOptions);

  // recast adds extra newlines that we don't want, https://github.com/facebook/jscodeshift/issues/249
  // need to remove them manually
  const lines = [];
  let isInStyled = false;
  transformed.split('\n').forEach((line, index, array) => {
    if (!isInStyled) {
      lines.push(line);
    } else if (
      line !== '' ||
      (line === '' && array[index + 1] && array[index + 1].includes('return'))
    ) {
      if (line.match(/^}\)+(\({}\)|\(\))?;?$/)) {
        isInStyled = false;
      }
      lines.push(line);
    }
    if (line.includes('styled.') || line.includes('styled(')) {
      isInStyled = true;
    }
  });

  return lines.join('\n');
}
