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
          new RegExp(
            `^${options.packageName || '@mui/material'}(/(SpeedDial|SpeedDialAction|SpeedDialIcon))?$`,
          ),
        ),
      )
      .forEach((path) => {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            // accept any of the speedDial classes imports
            const localName = specifier.local.name;
            if (
              localName === 'speedDialClasses' ||
              localName === 'speedDialActionClasses' ||
              localName === 'speedDialIconClasses'
            ) {
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

                    if (
                      precedingTemplateElement.value.raw.endsWith(
                        `${replacementSelectorPrefix} .`,
                      ) ||
                      precedingTemplateElement.value.raw.endsWith(`${replacementSelectorPrefix}.`)
                    ) {
                      // insert the replacement selector as a literal (the plugin will handle the final replacement)
                      const parts = replacementSelector.split('.').filter(Boolean);
                      const atomicParts = parts.map((p) => p.replace(/Mui[A-Za-z]+-/, ''));
                      const atomicExpressions = atomicParts.map((atomic) =>
                        j.memberExpression(memberExpression.value.object, j.identifier(atomic)),
                      );
                      const atomicClassesArgs = [memberExpressionIndex, 1, ...atomicExpressions];
                      // normalize the preceding template element so it ends with '&.' (no space)
                      precedingTemplateElement.value.raw =
                        precedingTemplateElement.value.raw.replace(
                          /&\s*\.?$/,
                          `${replacementSelectorPrefix}.`,
                        );
                      precedingTemplateElement.value.cooked = precedingTemplateElement.value.raw;

                      parent.expressions.splice(...atomicClassesArgs);
                      // insert an extra quasi '.' between the newly added expressions
                      parent.quasis.splice(
                        memberExpressionIndex + 1,
                        0,
                        j.templateElement({ raw: '.', cooked: '.' }, false),
                      );
                    }
                  }
                });
            }
          }
        });
      });

    const selectorRegex = new RegExp(`${replacementSelectorPrefix}${deprecatedClass}$`);
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
