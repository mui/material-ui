// The browser ends a `<style>` element at the first `</style>` it sees, even one sitting inside a
// CSS value, and reads whatever follows as HTML. `\3c` is the CSS escape for `<`, so the rule keeps
// its meaning but the text can no longer close the element.
const STYLE_TAG = /(<)(\/?style\b)/gi;

export default function escapeHtmlInCss(css: string) {
  // Runs over the whole stylesheet on every server render, and almost no CSS holds a `<` at all,
  // so the common case skips the scan below.
  if (!css.includes('<')) {
    return css;
  }
  return css.replace(STYLE_TAG, '\\3c $2');
}
