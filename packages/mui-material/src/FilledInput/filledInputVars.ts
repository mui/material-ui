/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * FilledInput density token identities — internal designer knobs (`private_*`
 * per the density RFC). The box height is the input's top/bottom padding (per
 * size). The floating label's resting/shrunk Y are separate seams
 * (`--FilledInputLabel-restY`/`--FilledInputLabel-shrinkY`) — set by the presets
 * (no clean formula from `topPad`, the offsets are hand-tuned per size), consumed
 * by InputLabel. `hiddenLabel` is out of scope (keeps its own literals).
 */
export const private_filledInputVars = {
  mediumTopPad: '--FilledInput-medium-topPad',
  smallTopPad: '--FilledInput-small-topPad',
  mediumBottomPad: '--FilledInput-medium-bottomPad',
  smallBottomPad: '--FilledInput-small-bottomPad',
  mediumInlinePad: '--FilledInput-medium-inlinePad',
  smallInlinePad: '--FilledInput-small-inlinePad',
} as const;
