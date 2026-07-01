/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * CardContent density token identities — internal designer knobs (`private_*`
 * per the density RFC). No size axis: base padding + the larger last-child
 * bottom padding, over the agnostic `--comp-*` seams.
 */
export const private_cardContentVars = {
  pad: '--CardContent-pad',
  padBottom: '--CardContent-padBottom',
} as const;
