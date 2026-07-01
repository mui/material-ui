/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * List density token identities (`private_*` per the density RFC). Static,
 * unprefixed literals imported by both the styled component AND the
 * `enhance*Density` presets, so emitted and targeted names can't drift.
 *
 * `blockPad` is the list's vertical breathing (`padding-block`, today `8px` when
 * not `disablePadding`). It's what gives a `Menu`/`MenuList` its top/bottom gap.
 */
export const private_listVars = {
  blockPad: '--List-blockPad',
} as const;
