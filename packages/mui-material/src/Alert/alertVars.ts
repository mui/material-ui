/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Alert density token identities — internal designer knobs (`private_*` per the
 * density RFC). No size axis: root block/inline padding + the icon→message gap,
 * over the agnostic `--comp-*` seams. The icon/message vertical alignment
 * paddings (`7px`/`8px`) stay literal (internal row alignment, not density).
 */
export const private_alertVars = {
  blockPad: '--Alert-blockPad',
  inlinePad: '--Alert-inlinePad',
  iconGap: '--Alert-iconGap',
} as const;
