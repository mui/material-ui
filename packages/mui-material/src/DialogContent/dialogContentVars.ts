/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * DialogContent density token identities — block/inline padding (`20px 24px`),
 * over the agnostic `--comp-*` seams. The `dividers` variant + `& + &` paddingTop
 * reset stay literal. `private_*` per the density RFC.
 */
export const private_dialogContentVars = {
  blockPad: '--DialogContent-blockPad',
  inlinePad: '--DialogContent-inlinePad',
} as const;
