/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Input (standard variant) density token identities — internal designer knobs
 * (`private_*` per the density RFC). The standard input's box is just the
 * InputBase baseline input padding (`4px 0 5px`; small `1px 0 5px`). The seam
 * lives on the **standard** input slot (not the shared InputBase baseline) so
 * the literal stays the zero-diff fallback for Filled/Outlined, which fully
 * override it. `topPad` is per size; `bottomPad` is shared (5 both). Inline is 0
 * (not tokenized); the root `marginTop:16` label reserve is typography-derived
 * (out of scope).
 */
export const private_inputVars = {
  mediumTopPad: '--Input-medium-topPad',
  smallTopPad: '--Input-small-topPad',
  bottomPad: '--Input-bottomPad',
} as const;
