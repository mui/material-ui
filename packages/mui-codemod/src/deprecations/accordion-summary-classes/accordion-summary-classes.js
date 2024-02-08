import { deprecatedClass, replacementSelector } from './postcss-plugin';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root.find(j.ObjectProperty, { key: { name: 'contentGutters' } }).forEach((path) => {
    if (
      path.parent?.parent?.node.key?.name === 'styleOverrides' &&
      path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiAccordionSummary'
    ) {
      path.replace(
        j.property(
          'init',
          j.identifier('gutters'),
          j.objectExpression([
            j.objectProperty(j.stringLiteral('& .MuiAccordionSummary-content'), path.node.value),
          ]),
        ),
      );
    }
  });

  const directRegex = new RegExp(`^${deprecatedClass}`);
  root
    .find(
      j.Literal,
      (literal) => typeof literal.value === 'string' && literal.value.match(directRegex),
    )
    .forEach((path) => {
      path.replace(j.literal(path.value.value.replace(directRegex, replacementSelector)));
    });

  // this is a special case for contentGutters as it's applied to the content child
  // but gutters is applied to the parent element, so the gutter class needs to go on the parent
  const childSelectorRegex = new RegExp(`(^&)? ${deprecatedClass}`);
  root
    .find(
      j.Literal,
      (literal) => typeof literal.value === 'string' && literal.value.match(childSelectorRegex),
    )
    .forEach((path) => {
      path.replace(j.literal(path.value.value.replace(childSelectorRegex, replacementSelector)));
    });

  return root.toSource(printOptions);
}
