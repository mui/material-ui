/**
 * @param {import('ast-types').namedTypes.ArrowFunctionExpression | import('ast-types').namedTypes.FunctionExpression} node
 */
export default function getReturnExpression(node) {
  let body = node.body;
  if (body === 'BlockStatement') {
    body = body.body;
  }

  if (Array.isArray(body)) {
    return body.find((statement) => statement.type === 'ReturnStatement')?.argument;
  }
  return body;
}
