/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Button density token identities — the Material UI layer's internal
 * designer knobs (`private_*` per the density RFC). Static, unprefixed literals
 * imported by both the styled component AND the `enhance*Density` presets that
 * map these to density steps, so the emitted and
 * targeted names can't drift. The agnostic seam (`--comp-pad`) and internal
 * default (`--_pad`) are the literal plumbing and live outside this map.
 */
export const private_buttonVars = {
  smallPad: '--Button-small-pad',
  mediumPad: '--Button-medium-pad',
  largePad: '--Button-large-pad',
} as const;
