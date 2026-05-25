/**
 * Public, agnostic CSS variables for TextField — the single-knob wrapper layer.
 * Each maps down to the variant-level `--OutlinedInput-*` (inward rule).
 * See docs/adr/0002-agnostic-public-css-vars.md and
 * docs/design/public-css-var-layering.md.
 */
const textFieldVars = {
  height: "--TextField-height",
  fontSize: "--TextField-font-size",
  color: "--TextField-color",
  borderColor: "--TextField-border-color",
  borderWidth: "--TextField-border-width",
  radius: "--TextField-radius",
} as const;

export default textFieldVars;
