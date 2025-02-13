import { classes } from './postcss-plugin';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;
  classes.forEach(({ deprecatedClass, replacementSelector }) => {
    root
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value.match(/^@mui\/material\/Alert$/))
      .forEach((path) => {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'alertClasses') {
            const deprecatedAtomicClass = deprecatedClass.replace('.MuiAlert-', '');
            root
              .find(j.MemberExpression, {
                object: { name: specifier.local.name },
                property: { name: deprecatedAtomicClass },
              })
              .forEach((memberExpression) => {
                const parent = memberExpression.parentPath.parentPath.value;
                if (parent.type === j.TemplateLiteral.name) {
                  const memberExpressionIndex = parent.expressions.findIndex(
                    (expression) => expression === memberExpression.value,
                  );
                  const precedingTemplateElement = parent.quasis[memberExpressionIndex];
                  const atomicClasses = replacementSelector
                    .replaceAll('MuiAlert-', '')
                    .split('.')
                    .filter(Boolean);

                  if (precedingTemplateElement.value.raw.endsWith('&.')) {
                    parent.expressions.splice(
                      memberExpressionIndex,
                      1,
                      j.memberExpression(
                        memberExpression.value.object,
                        j.identifier(atomicClasses[0]),
                      ),
                      j.memberExpression(
                        memberExpression.value.object,
                        j.identifier(atomicClasses[1]),
                      ),
                    );
                    parent.quasis.splice(
                      memberExpressionIndex,
                      1,
                      j.templateElement(
                        {
                          raw: precedingTemplateElement.value.raw,
                          cooked: precedingTemplateElement.value.cooked,
                        },
                        false,
                      ),
                      j.templateElement({ raw: '.', cooked: '.' }, false),
                    );
                  }
                }
              });
          }
        });
      });

    const selectorRegex = new RegExp(`^&${deprecatedClass}`);

    root
      .find(
        j.Literal,
        (literal) => typeof literal.value === 'string' && literal.value.match(selectorRegex),
      )
      .forEach((path) => {
        path.replace(j.literal(path.value.value.replace(selectorRegex, `&${replacementSelector}`)));
      });
  });
  return root.toSource(printOptions);
}
