// Raw names of the private custom properties the opt-in focus ring reads. Kept internal — the
// public handle is `focusVisibleVars` below.
export const focusVisibleOffsetVar = '--_focusVisible-offset';
export const focusVisibleBehaviorVar = '--_focusVisible-behavior';

/**
 * CSS custom-property handles for the opt-in focus ring (`theme.focusVisible`). They are emitted
 * regardless of the `cssVariables` option, so reference them to customize the ring while keeping
 * the per-component inset behavior — otherwise a custom `outlineOffset`/`boxShadow` clips on the
 * components that render inside an `overflow: hidden` (Tab, MenuItem, ListItemButton, …).
 *
 * - `behavior` resolves to `inset` on those clip-prone components and to empty elsewhere. Prefix a
 *   `boxShadow` with it so a two-color (WCAG C40) ring insets where it would otherwise clip.
 * - `offset` is the outline-offset sign multiplier (`1` outset, `-1` inset). Multiply a length by
 *   it to keep a custom `outlineOffset` inset-aware.
 *
 * @example
 * createTheme({
 *   focusVisible: { boxShadow: `${focusVisibleVars.behavior} 0 0 0 4px #9c27b0` },
 * });
 */
export const focusVisibleVars = {
  offset: `var(${focusVisibleOffsetVar}, 1)`,
  behavior: `var(${focusVisibleBehaviorVar}, )`,
};
