import { makeComponentVars } from '../styles/tokenAccess';

/**
 * Button density token identities (ADR-0003) — unprefixed keys, the typed
 * handle a consumer imports. `pad` is the agnostic seam; the sized keys are the
 * public designer knobs.
 */
export const buttonVars = {
  pad: 'Button-pad',
  smallPad: 'Button-small-pad',
  mediumPad: 'Button-medium-pad',
  largePad: 'Button-large-pad',
} as const;

/**
 * Resolve the bare, prefix-aware var names for a theme — used by the styled
 * component AND by consumers, so the names always match.
 *
 * @example
 * const v = getButtonVars(theme); // v.smallPad === '--mui-Button-small-pad' (cssVariables) | '--Button-small-pad' (plain)
 * <Box sx={{ [v.smallPad]: '2px 8px' }} />
 */
export const getButtonVars = makeComponentVars(buttonVars);
