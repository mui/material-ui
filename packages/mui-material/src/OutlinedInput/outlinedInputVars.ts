import { makeComponentVars } from '../styles/tokenAccess';

/**
 * OutlinedInput density token identities (ADR-0003): block + inline padding
 * (both sized), plus the `InputLabel-y` seam the `:has` bridge drives on the
 * floating label.
 */
export const outlinedInputVars = {
  padBlock: 'OutlinedInput-padBlock',
  padInline: 'OutlinedInput-padInline',
  smallPadBlock: 'OutlinedInput-small-padBlock',
  mediumPadBlock: 'OutlinedInput-medium-padBlock',
  smallPadInline: 'OutlinedInput-small-padInline',
  mediumPadInline: 'OutlinedInput-medium-padInline',
  labelY: 'InputLabel-y',
} as const;

export const getOutlinedInputVars = makeComponentVars(outlinedInputVars);
