// Inside a `<style>` element the HTML tokenizer stays in RAWTEXT state until it reaches `</style`,
// so a style value containing one closes the element and the rest of the stylesheet is parsed as
// HTML. `\3c` is the CSS escape for `<` and parses back to the same value, leaving the rule
// unchanged. `<!--` is escaped as well because it opens a comment in a few legacy parsing modes.
const STYLE_TAG = /(<)(\/?style\b)/gi;
const COMMENT_OPEN = /(<)(!--)/g;

export default function escapeHtmlInCss(css: string) {
  if (!css.includes('<')) {
    return css;
  }
  return css.replace(STYLE_TAG, '\\3c $2').replace(COMMENT_OPEN, '\\3c $2');
}
