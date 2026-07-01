/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * TableCell density token identities — the cell padding. Block padding differs
 * per size (`normal` 16 / `small` 6); inline padding is shared (16). Over the
 * agnostic `--comp-*` seams. The `paddingCheckbox`/`padding="none"` affordances
 * stay literal. `private_*` per the density RFC.
 */
export const private_tableCellVars = {
  mediumBlockPad: '--TableCell-medium-blockPad',
  smallBlockPad: '--TableCell-small-blockPad',
  inlinePad: '--TableCell-inlinePad',
} as const;
