/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * MenuItem density token identities — the Material UI layer's internal
 * designer knobs (`private_*` per the density RFC). Static, unprefixed literals
 * imported by both the styled component AND the `enhance*Density` presets that
 * map these to density steps, so the emitted and targeted names can't drift.
 * The agnostic seam (`--comp-<key>`) and internal default (`--_<key>`) are the
 * literal plumbing and live outside this map.
 *
 * MenuItem's compactness axis is the `dense` boolean (not small/medium/large):
 * each sized token has a `dense` counterpart the dense variant routes to.
 */
export const private_menuItemVars = {
  minHeight: '--MenuItem-minHeight',
  denseMinHeight: '--MenuItem-dense-minHeight',
  blockPad: '--MenuItem-blockPad',
  denseBlockPad: '--MenuItem-dense-blockPad',
  inlinePad: '--MenuItem-inlinePad',
  denseInlinePad: '--MenuItem-dense-inlinePad',
} as const;
