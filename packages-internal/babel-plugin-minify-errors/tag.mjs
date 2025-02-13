/**
 * @param {TemplateStringsArray} strings
 * @param {...any} expressions
 */
export default function minifiedError(strings, ...expressions) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (i < expressions.length ? String(expressions[i]) : '');
  }, '');
}
