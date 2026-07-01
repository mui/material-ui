/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Radio density token identities — the touch-target `padding` around the icon
 * (9px both sizes today), routed into SwitchBase's `--comp-pad` seam per size.
 * Mirrors Checkbox. `private_*` per the density RFC.
 */
export const private_radioVars = {
  mediumPad: '--Radio-medium-pad',
  smallPad: '--Radio-small-pad',
} as const;
