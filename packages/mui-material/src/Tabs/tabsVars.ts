/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Tabs (root) density token identity — the strip's `min-height`, sizing (raw px
 * per preset). Must reflow to the **same px** as `Tab`'s default `min-height`
 * (the pairing) or the strip and its tabs get a visible seam. `private_*` per
 * the density RFC.
 */
export const private_tabsVars = {
  minHeight: '--Tabs-minHeight',
} as const;
