/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Tooltip density token identity — the single internal var the arrow derives its
 * size from (`private_*` per the density RFC). Imported by both the styled
 * component (which defines its `1em` default on the Popper root) AND the
 * `enhance*Density` presets (which emit it on the `tooltip` slot), so the emitted
 * and consumed names can't drift. Regular (pointer) tooltip only.
 */
export const private_tooltipVars = {
  arrowSize: '--_arrowSize',
} as const;
