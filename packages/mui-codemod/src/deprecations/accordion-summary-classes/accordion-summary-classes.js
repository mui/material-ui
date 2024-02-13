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
