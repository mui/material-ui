/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Tooltip density token identities — the Material UI layer's internal designer
 * knobs (`private_*` per the density RFC). Static, unprefixed literals imported
 * by both the styled component AND the `enhance*Density` presets that map these
 * to density steps, so emitted and targeted names can't drift. The agnostic
 * seams (`--comp-*`) and internal defaults (`--_*`) are the literal plumbing and
 * live outside this map. Regular (pointer) tooltip only — the `touch` variant is
 * out of density scope and keeps its own literals.
 */
export const private_tooltipVars = {
  blockPad: '--Tooltip-blockPad',
  inlinePad: '--Tooltip-inlinePad',
  offset: '--Tooltip-offset',
  arrowSize: '--Tooltip-arrowSize',
} as const;
