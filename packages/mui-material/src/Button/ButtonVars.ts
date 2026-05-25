/**
 * Public, agnostic CSS variables for Button — the supported theming surface.
 * Single source of truth for the variable names; fallbacks live at each usage
 * site (the Material Design spec defaults). Overriding any of these opts that
 * property out of the spec. See docs/adr/0002-agnostic-public-css-vars.md.
 */
const buttonVars = {
  paddingBlock: "--Button-padding-block",
  paddingInline: "--Button-padding-inline",
  fontSize: "--Button-font-size",
  bg: "--Button-bg",
  color: "--Button-color",
  borderColor: "--Button-border-color",
  borderWidth: "--Button-border-width",
  radius: "--Button-radius",
  shadow: "--Button-shadow",
  ring: "--Button-ring",
} as const;

export default buttonVars;
