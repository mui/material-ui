import { makeComponentVars } from '../styles/tokenAccess';

/**
 * OutlinedInput density token identities — the Material UI layer's
 * public sized knobs (block + inline padding, prefixed via
 * `getOutlinedInputVars`). The agnostic seams (`--comp-padBlock`,
 * `--comp-padInline`, and the `--comp-labelY` the `:has` bridge drives on the
 * floating label) are literal and unprefixed, so they live outside this map.
 */
export const outlinedInputVars = {
  smallPadBlock: 'OutlinedInput-small-padBlock',
  mediumPadBlock: 'OutlinedInput-medium-padBlock',
  smallPadInline: 'OutlinedInput-small-padInline',
  mediumPadInline: 'OutlinedInput-medium-padInline',
} as const;

export const getOutlinedInputVars = makeComponentVars(outlinedInputVars);
