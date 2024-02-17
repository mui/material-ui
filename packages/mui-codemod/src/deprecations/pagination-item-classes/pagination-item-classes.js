import { deprecatedClass, replacementSelector } from './postcss-plugin';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value.match(/^@mui\/material\/PaginationItem$/))
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === 'paginationItemClasses'
        ) {
          root
            .find(j.MemberExpression, {
              object: { name: specifier.local.name },
              property: { name: 'textPrimary' },
            })
            .forEach((memberExpression) => {
              const parent = memberExpression.parentPath.parentPath.value;
              if (parent.type === j.TemplateLiteral.name) {
                const memberExpressionIndex = parent.expressions.findIndex(
                  (expression) => expression === memberExpression.value,
                );
                const precedingTemplateElement = parent.quasis[memberExpressionIndex];
                if (precedingTemplateElement.value.raw.endsWith(' .')) {
                  parent.expressions.splice(
                    memberExpressionIndex,
                    1,
                    j.memberExpression(memberExpression.value.object, j.identifier('text')),
                    j.memberExpression(memberExpression.value.object, j.identifier('primary')),
                  );
                  parent.quasis.splice(
                    memberExpressionIndex,
                    1,
                    j.templateElement(
                      {
                        raw: precedingTemplateElement.value.raw.replace(' ', ''),
                        cooked: precedingTemplateElement.value.cooked.replace(' ', ''),
                      },
                      false,
                    ),
                    j.templateElement({ raw: ' .', cooked: ' .' }, false),
                  );
                }
              }
            });
        }
      });
    });

  const selectorRegex = new RegExp(`^& ${deprecatedClass}`);
  root
    .find(
      j.Literal,
      (literal) => typeof literal.value === 'string' && literal.value.match(selectorRegex),
    )
    .forEach((path) => {
      path.replace(j.literal(path.value.value.replace(selectorRegex, `&${replacementSelector}`)));
    });

  return root.toSource(printOptions);
}
