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
    const replacementSelectorPrefix = '&';
    root
      .find(j.ImportDeclaration)
      .filter((path) =>
        path.node.source.value.match(
          new RegExp(`^${options.packageName || '@mui/material'}(/Slider)?$`),
        ),
      )
      .forEach((path) => {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'sliderClasses') {
            const deprecatedAtomicClass = deprecatedClass.replace(
              `${deprecatedClass.split('-')[0]}-`,
              '',
            );
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
                    .replaceAll('MuiSlider-', '')
                    .replaceAll(replacementSelectorPrefix, '')
                    .replaceAll(' > ', '')
                    .split('.')
                    .filter(Boolean);

                  if (
                    precedingTemplateElement.value.raw.endsWith(
                      deprecatedClass.startsWith(' ')
                        ? `${replacementSelectorPrefix} .`
                        : `${replacementSelectorPrefix}.`,
                    )
                  ) {
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

                    if (replacementSelector.includes(' > ')) {
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
                        j.templateElement({ raw: ' > .', cooked: ' > .' }, false),
                      );
                    } else {
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
                }
              });
          }
        });
      });

    const selectorRegex = new RegExp(`^${replacementSelectorPrefix}${deprecatedClass}`);
    root
      .find(
        j.Literal,
        (literal) => typeof literal.value === 'string' && literal.value.match(selectorRegex),
      )
      .forEach((path) => {
        path.replace(
          j.literal(
            path.value.value.replace(
              selectorRegex,
              `${replacementSelectorPrefix}${replacementSelector}`,
            ),
          ),
        );
      });
  });
  return root.toSource(printOptions);
}
