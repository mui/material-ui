/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Badge density token identities — the bubble size (min-width/height, raw px)
 * and padding, per state: `standard` (count bubble, 20px / `0 6px`) and `dot`
 * (6px / 0). Over the agnostic `--comp-*` seams. `private_*` per the density RFC.
 */
export const private_badgeVars = {
  standardSize: '--Badge-standard-size',
  standardPad: '--Badge-standard-pad',
  dotSize: '--Badge-dot-size',
  dotPad: '--Badge-dot-pad',
} as const;
