/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Chip density token identity — the single internal `height` var (per size, raw
 * px). The avatar/icon/deleteIcon dims all derive from it via `calc(height -
 * inset)`, so they scale together with the box (`private_*` per the density RFC).
 */
export const private_chipVars = {
  height: '--_height',
} as const;
