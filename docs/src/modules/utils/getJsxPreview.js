// docs/pages/components/material-icons.js doesn't provide the source
export default function getJsxPreview(code) {
  /* regex matches the content of the return statement in the default export:
   *
   * `export default.*`
   * `\n  return (\n` or `\n  return `
   *
   *  everything (not greedy), until:
   *
   * `  );\n}` or `;\n}`
   *
   */
  let jsx = code.match(
    /export default .*(\n {2}return \(\n|\n {2}return )(.*?)(\n {2}\);\n}|;\n})/s,
  );
  // Just the match, or the full source if no match, so as not to break the Collapse transition.
  jsx = jsx ? jsx[2] : code;
  // Number of leading spaces on the first line
  const indentSize = jsx.match(/^ */)[0].length;
  // Remove leading spaces from each line
  return jsx.split(/\n/).reduce((acc, line) => `${acc}${line.slice(indentSize)}\n`, '');
}
