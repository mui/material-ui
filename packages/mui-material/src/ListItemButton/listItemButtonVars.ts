/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * ListItemButton density token identities — block padding (8, dense 4) + gutters
 * inline padding (16), over the agnostic `--comp-*` seams (mirrors MenuItem's
 * `dense` axis). `private_*` per the density RFC.
 */
export const private_listItemButtonVars = {
  blockPad: '--ListItemButton-blockPad',
  denseBlockPad: '--ListItemButton-dense-blockPad',
  inlinePad: '--ListItemButton-inlinePad',
} as const;
