export default function getJsxPreview(code) {
  /* The regex matches the content of the return statement in the default export,
   * stripping any wrapper divs:
   *
   * `export default.*`
   * `\n  return (\n` or `\n  return `
   * `    <div.*>\n` (optional)
   *  everything until:
   * `\n    </div>` (optional)
   * `  );\n}` or `;\n}`
   */
  let jsx = code.match(
    /export default .*(?:\n {2}return \(\n|\n {2}return )(?: {4}<div.*?>\n)?(.*?)(\n {4}<\/div>)?(\n {2}\);\n}|;\n})/s,
  );
  // Just the match, otherwise the full source if either no match or preview disabled,
  // so as not to break the Collapse transition.
  jsx = jsx ? jsx[1] : code;

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
