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
        const replacementValue = map[node.value];
        if (replacementValue !== undefined) {
          node.value = replacementValue;
        }
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
      const replacementValue = map[node.value];
      if (replacementValue !== undefined) {
        node.value = replacementValue;
      }
    });

  return root.toSource(printOptions);
}
