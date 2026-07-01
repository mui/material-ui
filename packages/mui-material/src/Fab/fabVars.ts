/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Fab density token identities — the circular size (width/height) per size
 * (small 40 / medium 48 / large 56), over `--comp-size` (raw px per preset).
 * The `extended` variant (auto width + inline padding) stays literal. `private_*`.
 */
export const private_fabVars = {
  smallSize: '--Fab-small-size',
  mediumSize: '--Fab-medium-size',
  largeSize: '--Fab-large-size',
} as const;
