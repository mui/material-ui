/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * OutlinedInput density token identities — internal designer knobs (`private_*`
 * per the density RFC). Static literals imported by both the styled component
 * AND the `enhance*Density` presets so emitted and targeted names can't drift.
 * Per-size (medium default / small); block vs inline split because the outlined
 * label centers on the block padding. The agnostic seams (`--comp-*`) and
 * internal defaults (`--_*`) are the literal plumbing, outside this map.
 */
export const private_outlinedInputVars = {
  mediumBlockPad: '--OutlinedInput-medium-blockPad',
  smallBlockPad: '--OutlinedInput-small-blockPad',
  mediumInlinePad: '--OutlinedInput-medium-inlinePad',
  smallInlinePad: '--OutlinedInput-small-inlinePad',
} as const;
