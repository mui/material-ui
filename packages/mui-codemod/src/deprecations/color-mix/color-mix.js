/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root.find(j.TemplateLiteral).forEach((path) => {
    if (path.node.type === 'TemplateLiteral') {
      if (path.node.quasis?.[0]?.value?.raw === 'rgba(') {
        path.node.quasis[0] = j.templateElement({ raw: 'color-mix(', cooked: 'color-mix(' }, false);
        path.node.expressions[0].property = j.identifier(
          path.node.expressions[0].property.name.replace('Channel', ''),
        );

        if (path.node.expressions.length === 2) {
          path.node.quasis[1] = j.templateElement(
            {
              raw: ' / transparent calc(',
              cooked: ' / transparent calc(',
            },
            false,
          );
          path.node.quasis[2] = j.templateElement({ raw: ' * 100%))', cooked: ' * 100%))' }, false);
        }
      }
    }
  });

  return root.toSource(printOptions);
}
