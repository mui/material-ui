/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * InputLabel density token identity — the outlined label's resting translateY.
 * A seam **set by the input** (OutlinedInput/FilledInput), not owned here: the
 * label is a preceding DOM sibling of the input, so the input pushes this value
 * onto the label via `:has(~ &)`. The label only consumes it (`private_*` per
 * the density RFC).
 */
export const private_inputLabelVars = {
  y: '--InputLabel-y',
} as const;
