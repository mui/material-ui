// The browser ends a `<style>` element at the first `</style>` it sees, even one sitting inside a
// CSS value, and reads whatever follows as HTML. `\3c` is the CSS escape for `<`, so the rule keeps
// its meaning but the text can no longer close the element. `<!--` is escaped for the same reason,
// as some parsers treat it as the start of a comment.
const STYLE_TAG = /(<)(\/?style\b)/gi;
const COMMENT_OPEN = /(<)(!--)/g;

export default function escapeHtmlInCss(css: string) {
  if (!css.includes('<')) {
    return css;
  }
  return css.replace(STYLE_TAG, '\\3c $2').replace(COMMENT_OPEN, '\\3c $2');
}
