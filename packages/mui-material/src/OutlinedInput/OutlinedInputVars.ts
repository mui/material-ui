/**
 * Public, agnostic CSS variables for OutlinedInput — the variant layer.
 * Each falls back inward to the base `--InputBase-*` then the Material spec
 * default. See docs/adr/0002-agnostic-public-css-vars.md and
 * docs/design/public-css-var-layering.md.
 */
const outlinedInputVars = {
  color: '--OutlinedInput-color',
  fontSize: '--OutlinedInput-font-size',
  height: '--OutlinedInput-height',
  paddingBlock: '--OutlinedInput-padding-block',
  paddingInline: '--OutlinedInput-padding-inline',
  borderColor: '--OutlinedInput-border-color',
  borderWidth: '--OutlinedInput-border-width',
  radius: '--OutlinedInput-radius',
} as const;

export default outlinedInputVars;
