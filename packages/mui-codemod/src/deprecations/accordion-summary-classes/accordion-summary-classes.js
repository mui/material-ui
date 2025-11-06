import { deprecatedClass, replacementSelector } from './postcss-plugin';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  // contentGutters is a special case as it's applied to the content child
  // but gutters is applied to the parent element, so the gutter class needs to go on the parent

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value.match(/^@mui\/material\/AccordionSummary$/))
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === 'accordionSummaryClasses'
        ) {
          root
            .find(j.MemberExpression, {
              object: { name: specifier.local.name },
              property: { name: 'contentGutters' },
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
                    j.memberExpression(memberExpression.value.object, j.identifier('gutters')),
                    j.memberExpression(memberExpression.value.object, j.identifier('content')),
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
