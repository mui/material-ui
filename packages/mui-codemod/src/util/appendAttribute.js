/**
 * @param {import('jscodeshift')} j
 * @param {{ target: import('jscodeshift').JSXElement; attributeName: string; expression: import('ast-types/gen/kinds').ExpressionKind | import('ast-types/gen/kinds').JSXEmptyExpressionKind; }} options
 */
export default function appendAttribute(j, options) {
  const { target, attributeName, expression } = options;

  target.openingElement.attributes.push(
    j.jsxAttribute(j.jsxIdentifier(attributeName), j.jsxExpressionContainer(expression)),
  );
}
