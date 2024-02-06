/**
 * Pushes an expression to a known object. handles local object and variable declaration.
 *
 * @param {import('jscodeshift')} j
 * @param {{ target: import('jscodeshift').JSXAttribute; expression: import('ast-types/gen/kinds').ExpressionKind; key: string }} options
 *
 * @example push expression to `slots.transition` => <Component slots={{ transition: <expression> }} />
 * @example push expression to `slots.transition` => <Component slots={{ ...slots, transition: <expression> }} />
 */
export default function assignObject(j, options) {
  const { target, expression, key } = options;
  if (target && target.type === 'JSXAttribute') {
    const expContainer = /** @type import('jscodeshift').JSXExpressionContainer */ (target.value);

    if (expContainer.expression.type === 'ObjectExpression') {
      // case `<prop>={{ ... }}`
      expContainer.expression.properties.push(j.objectProperty(j.identifier(key), expression));
    } else if (expContainer.expression.type === 'Identifier') {
      // case `<prop>={outerVariable}
      expContainer.expression = j.objectExpression([
        j.spreadElement(j.identifier(expContainer.expression.name)),
        j.objectProperty(j.identifier(key), expression),
      ]);
    }
  }
}
