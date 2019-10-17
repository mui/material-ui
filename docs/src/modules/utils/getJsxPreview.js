// docs/pages/components/material-icons.js doesn't provide the source
export default function getJsxPreview(code, demoOptions) {
/* regex matches the content of the return statement in the default export:
 *
 * `export default.*`
 * `\n  return (\n` or `\n  return `
 *
 *  everything (not greedy), until:
 *
 * `  );\n}` or `;\n}`
 */
let jsx = code.match(
  /export default .*(\n {2}return \(\n|\n {2}return )(.*?)(\n {2}\);\n}|;\n})/s,
);
/* Just the match, otherwise the full source if no match or disabled,
so as not to break the Collapse transition. */
jsx = jsx && demoOptions.defaultCodeOpen !== false ? jsx[2] : code;

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
