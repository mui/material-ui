/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * InputLabel density token identities — the floating label's translateY seams,
 * **set by the input** (OutlinedInput/FilledInput), not owned here: the label is
 * a preceding DOM sibling of the input, so the input (or a preset) pushes these
 * onto the label via `:has(~ &)`. The label only consumes them (`private_*` per
 * the density RFC). `y` = outlined resting Y; `filledRestY`/`filledShrinkY` =
 * the filled label's resting/shrunk Y (both inside the box).
 */
export const private_inputLabelVars = {
  y: '--InputLabel-y',
  filledRestY: '--FilledInputLabel-restY',
  filledShrinkY: '--FilledInputLabel-shrinkY',
} as const;
