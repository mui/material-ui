/**
 * Public, agnostic CSS variables for InputBase — the base layer of the input
 * stack. Single source of truth for the names; fallbacks (Material spec
 * defaults) live at each usage site. See docs/adr/0002-agnostic-public-css-vars.md.
 */
const inputBaseVars = {
  color: '--InputBase-color',
  fontSize: '--InputBase-font-size',
  lineHeight: '--InputBase-line-height',
  height: '--InputBase-height',
  paddingBlock: '--InputBase-padding-block',
  paddingInline: '--InputBase-padding-inline',
} as const;

export default inputBaseVars;
