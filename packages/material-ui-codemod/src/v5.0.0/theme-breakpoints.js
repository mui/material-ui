const map = { xs: 'sm', sm: 'md', md: 'lg', lg: 'xl', xl: 'xl' };

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { property: { name: 'breakpoints' } },
        property: { type: 'Identifier', name: 'down' },
      },
    })
    .forEach((path) => {
      path.node.arguments.forEach((node) => {
        node.value = map[node.value];
      });
    });

  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { property: { name: 'breakpoints' } },
        property: { type: 'Identifier', name: 'between' },
      },
    })
    .forEach((path) => {
      const node = path.node.arguments[1];
      node.value = map[node.value];
    });

  return root.toSource(printOptions);
}
