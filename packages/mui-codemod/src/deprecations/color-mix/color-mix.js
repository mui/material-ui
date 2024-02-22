/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  if (file.path.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root.find(j.TemplateLiteral).forEach((path) => {
    if (path.node.type === 'TemplateLiteral') {
      if (path.node.quasis?.[0]?.value?.raw.endsWith('rgba(')) {
        const newValue = path.node.quasis?.[0]?.value?.raw.replace(
          'rgba(',
          'color-mix(in var(--color-space), ',
        );
        path.node.quasis[0] = j.templateElement({ raw: newValue, cooked: newValue }, false);

        if (path.node.expressions.length === 1) {
          const value = path.node.quasis[path.node.quasis.length - 1].value.raw;
          const matches = value.match(/[0-9]\.[0-9]+/);
          const percent = `, transparent ${(100 - Number(matches[0]) * 100).toFixed(0)}%)`;
          path.node.quasis[path.node.quasis.length - 1] = j.templateElement(
            { raw: percent, cooked: percent },
            false,
          );
        }

        if (path.node.expressions.length >= 2) {
          path.node.quasis[1] = j.templateElement(
            {
              raw: ', transparent ',
              cooked: ', transparent ',
            },
            false,
          );
          path.node.quasis[path.node.quasis.length - 1] = j.templateElement(
            { raw: '%)', cooked: '%)' },
            false,
          );
        }
      }
    }
  });

  return root
    .toSource(printOptions)
    .replace(/([a-z][a-zA-Z]+)Channel/g, '$1')
    .replace(
      /\$\{\s+?theme\.vars\.palette\.([a-zA-Z]+)\.([a-zA-Z]+)Opacity\s+?\} \+ \$\{\s+?theme\.vars\.palette\.([a-zA-Z]+)\.([a-zA-Z]+)Opacity\s+?\}/g,
      `\${(100 - (theme.palette.$1.$2Opacity + theme.palette.$3.$4Opacity) * 100).toFixed(2)}`,
    )
    .replace(
      /\$\{\s+?theme\.vars\.palette\.([a-zA-Z]+)\.([a-zA-Z]+)Opacity\s+?\}/g,
      `\${(100 - theme.palette.$1.$2Opacity * 100).toFixed(0)}`,
    );
}
