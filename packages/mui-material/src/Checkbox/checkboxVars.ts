/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Checkbox density token identities — internal designer knobs (`private_*` per
 * the density RFC). The touch-target `padding` (9px both sizes today) lives on
 * the shared `SwitchBase`; Checkbox routes its per-size public token into the
 * agnostic seam (`--comp-pad`) over the `9px` default. `private_*`.
 */
export const private_checkboxVars = {
  mediumPad: '--Checkbox-medium-pad',
  smallPad: '--Checkbox-small-pad',
} as const;
