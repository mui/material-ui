/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Toolbar density token identities — the gutter inline padding (16 base / 24 ≥sm)
 * + the `dense` variant min-height (48, raw px). The `regular` min-height comes
 * from `theme.mixins.toolbar` (fixed app-bar chrome height) and stays literal.
 * `private_*` per the density RFC.
 */
export const private_toolbarVars = {
  inlinePad: '--Toolbar-inlinePad',
  wideInlinePad: '--Toolbar-wideInlinePad',
  denseMinHeight: '--Toolbar-denseMinHeight',
} as const;
