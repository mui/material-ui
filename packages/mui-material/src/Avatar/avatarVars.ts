/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Avatar density token identity — the square `width`/`height` (40px today),
 * over the agnostic `--comp-size` seam. Sizing → raw px per preset. `fontSize`
 * (the initials) stays literal (typography). `private_*` per the density RFC.
 */
export const private_avatarVars = {
  size: '--Avatar-size',
} as const;
