/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Autocomplete density token identities — the option (listbox item) geometry,
 * mirroring MenuItem: min-height (raw px; collapses to `auto` ≥sm via the seam
 * fallback) + block/inline padding (spacing). The input's density comes from its
 * variant (OutlinedInput/etc., already tokenized). `private_*` per the RFC.
 */
export const private_autocompleteVars = {
  optionMinHeight: '--Autocomplete-option-minHeight',
  optionBlockPad: '--Autocomplete-option-blockPad',
  optionInlinePad: '--Autocomplete-option-inlinePad',
} as const;
