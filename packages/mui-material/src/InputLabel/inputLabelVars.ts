/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * InputLabel density token identities — the floating label's translateY seams.
 * The label defines its own defaults and consumes them; the input
 * (OutlinedInput/FilledInput) pushes density values onto the label via
 * `:has(~ &)` (`private_*` per the density RFC). `y` = outlined resting Y;
 * `restY`/`shrinkY` = the filled label's resting/shrunk Y.
 */
export const private_inputLabelVars = {
  y: '--_y',
  restY: '--_restY',
  shrinkY: '--_shrinkY',
} as const;
