/**
 * Convert an array of style sheets to a CSS string.
 *
 * The input is the output of `theme.generateStyleSheets()` — an array of objects.
 * Each object maps a top-level key to either:
 *
 *   1. A flat var map `{ cssVarName: value }` — for plain selectors (`:root`,
 *      `[data-mui-color-scheme="dark"]`, `.dark`, etc.)
 *
 *   2. A nested selector map `{ innerSelector: { cssVarName: value } }` — for
 *      `@media (prefers-color-scheme: ...)` blocks emitted when `colorSchemeSelector`
 *      is `'media'`.
 *
 * Multiple entries with the same selector are preserved in order and must NOT
 * be merged (e.g. two `:root` blocks for base vars and contrast vars).
 *
 * @param sheets The style sheets to convert.
 * @returns A CSS string.
 */
function styleSheetsToString(sheets: Array<Record<string, any>>): string {
  let css = '';
  for (const sheet of sheets) {
    for (const [selector, vars] of Object.entries(sheet)) {
      if (selector.startsWith('@')) {
        // @media wrapper: { '@media (...)': { ':root': { prop: value } } }
        let inner = '';
        for (const [innerSelector, innerVars] of Object.entries(vars as Record<string, any>)) {
          const body = Object.entries(innerVars as Record<string, string | number>)
            .map(([prop, value]) => `    ${prop}: ${value};`)
            .join('\n');
          if (body) {
            inner += `  ${innerSelector} {\n${body}\n  }\n`;
          }
        }
        if (inner) {
          css += `${selector} {\n${inner}}\n`;
        }
      } else {
        // Flat selector: { 'selector': { prop: value } }
        const body = Object.entries(vars as Record<string, string | number>)
          .map(([prop, value]) => `  ${prop}: ${value};`)
          .join('\n');
        if (body) {
          css += `${selector} {\n${body}\n}\n`;
        }
      }
    }
  }
  return css;
}

export default styleSheetsToString;
