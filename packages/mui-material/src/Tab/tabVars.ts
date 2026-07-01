/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Tab density token identities — internal designer knobs (`private_*` per the
 * density RFC). Two content-driven states (like MenuItem's `dense`): **default**
 * (text/icon-only) and **icon+label** (taller, stacked) — each owns its block
 * pad + min-height so a preset can tune them independently; inline pad is shared.
 * `minHeight`/`iconLabelMinHeight` are sizing (raw px per preset, paired with
 * `Tabs`); the rest are spacing. Icon gaps are split stack (top/bottom) vs
 * inline (start/end). Seams (`--comp-*`) + defaults (`--_*`) are the plumbing.
 */
export const private_tabVars = {
  minHeight: '--Tab-minHeight',
  iconLabelMinHeight: '--Tab-iconLabel-minHeight',
  blockPad: '--Tab-blockPad',
  iconLabelBlockPad: '--Tab-iconLabel-blockPad',
  inlinePad: '--Tab-inlinePad',
  iconStackGap: '--Tab-icon-stackGap',
  iconInlineGap: '--Tab-icon-inlineGap',
} as const;
