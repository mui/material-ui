/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * ToggleButton density token identities — the uniform `padding` per size
 * (11/7/15 today), over the agnostic `--comp-pad` seam. `private_*` per the
 * density RFC.
 */
export const private_toggleButtonVars = {
  smallPad: '--ToggleButton-small-pad',
  mediumPad: '--ToggleButton-medium-pad',
  largePad: '--ToggleButton-large-pad',
} as const;
