/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Chip density token identities — internal designer knobs (`private_*` per the
 * density RFC). The primary lever is **height** (per size, raw px): the
 * avatar/icon/deleteIcon dims all derive from it via `calc(height - inset)`, so
 * they scale together. The label's inline padding is the spacing lever (per
 * size). Seams (`--comp-*`) + defaults (`--_*`) are the plumbing.
 */
export const private_chipVars = {
  mediumHeight: '--Chip-medium-height',
  smallHeight: '--Chip-small-height',
  mediumPadInline: '--Chip-medium-padInline',
  smallPadInline: '--Chip-small-padInline',
} as const;
