// docs/pages/components/material-icons.js doesn't provide the source
export default function getJsxPreview(code, demoOptions) {
  /* The regex matches the content of the return statement in the default export,
   * stripping any wrapper divs:
   *
   * `export default.*`
   * `\n  return (\n` or `\n  return `
   * `    <div.*>\n` (optional)
   * `      <div.*>\n` (optional)
   *  everything until:
   * `\n    </div>` (optional)
   * `\n  </div>` (optional)
   * `  );\n}` or `;\n}`
   */
  let jsx = code.match(
    /export default .*(?:\n {2}return \(\n|\n {2}return )(?: {4}<div.*?>\n)?(?: {6}<div.*?>\n)?(.*?)(\n {6}<\/div>)?(\n {4}<\/div>)?(\n {2}\);\n}|;\n})/s,
  );
  /* Just the match, otherwise the full source if no match or disabled,
so as not to break the Collapse transition. */
  jsx = jsx && demoOptions.defaultCodeOpen !== false ? jsx[1] : code;

  // Remove leading spaces from each line
  return jsx.split(/\n/).reduce(
    (acc, line) =>
      `${acc}${line.slice(
        // Number of leading spaces on the first line
        jsx.match(/^ */)[0].length,
      )}\n`,
    '',
  );
}
