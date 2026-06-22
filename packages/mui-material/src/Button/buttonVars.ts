import { makeComponentVars } from '../styles/tokenAccess';

/**
 * Button density token identities (ADR-0003) — the Material UI layer's public
 * designer knobs (prefixed via `getButtonVars`), the typed handle a consumer
 * imports. The agnostic seam (`--comp-pad`) and internal default (`--_pad`) are
 * the literal, unprefixed plumbing and deliberately live outside this map.
 */
export const buttonVars = {
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
