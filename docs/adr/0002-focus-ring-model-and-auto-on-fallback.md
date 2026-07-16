---
status: accepted
---

# Focus-ring model: v1 opt-in `theme.focusVisible`, auto-on fallback deferred

v1 ships **one opt-in feature**: `theme.focusVisible` renders a curated keyboard focus ring across ButtonBase and its derived components. The **auto-on a11y fallback** (render a ring whenever `disableRipple` removes the only indicator) is a **separate follow-up RFC**, not part of v1.

`theme.focusVisible` is:

| Value       | v1 behavior                                                                          |
| :---------- | :----------------------------------------------------------------------------------- |
| `undefined` | No ring (default, non-breaking)                                                      |
| `true`      | Curated outline ring, resolved at `createTheme` time                                 |
| object      | Merged over the curated default (partial override)                                   |
| `false`     | Reserved kill-switch — same as `undefined` today, meaningful once the fallback lands |

The value is normalized once (`true` → curated object, object → merged over it) so components read a resolved object and never the boolean. Curated default: `{ outlineStyle: 'solid', outlineColor: palette.primary.main, outlineWidth: 2, outlineOffset: 'calc(var(--_focusVisible-offset, 1) * 2px)' }`. The offset is a per-component sign flip: `--_focusVisible-offset` is `1` (outset) by default and `-1` on a clip-prone component, scaled by the resolved width — so a clip-prone component insets the ring without knowing the width. A user-provided `outlineOffset` still replaces the calc verbatim.

## Why this shape

- **Opt-in, not auto-on, for v1:** auto-restoring the ring when `disableRipple` is set is a **default rendering change** for every app that disables the ripple — it needs its own RFC, release-note callout, and visual-regression pass. Shipping it inside the opt-in key would couple two decisions. So v1 is purely additive: an unconfigured theme renders exactly as today.
- **`false` reserved now, not repurposed later:** today `undefined` and `false` both mean "no ring". They diverge only when the fallback lands — at that point `undefined` starts to mean "ring whenever `disableRipple`", a **visual change** for apps that already hand-rolled a ring (they would get a double ring). `false` is the escape they set now to stay opted out through that transition. Reserving it in v1 keeps the future non-breaking.

## Consequences

- v1 is non-breaking: no app changes rendering unless it sets `theme.focusVisible`.
- Scope is defined by mechanism — every component that renders `ButtonBase` (Button, IconButton, Fab, Tab, MenuItem, ListItemButton, Chip when clickable/deletable, Checkbox/Radio/Switch via SwitchBase, …), plus Slider's thumb and Link, which carry `.Mui-focusVisible` and are wired explicitly. Non-`.Mui-focusVisible` inputs (TextField/InputBase) stay out of scope.
- Components whose keyboard indicator is a background tint (`palette.action.focus`: MenuItem, Chip, ListItemButton, …) get the ring **additively** on top of the tint. Excluding a component is a `styleOverrides` recipe (`&.Mui-focusVisible { outlineColor: 'transparent' }` — keeps the forced-colors fallback; `outline: 0` would kill it).
- **Clip-prone components** (rendered inside a MUI-owned `overflow: hidden` — Tab, MenuItem, ListItemButton, BottomNavigationAction, CardActionArea, Autocomplete option) inset the ring by spreading a shared `insetFocusRing` on their root: `--_focusVisible-offset: -1` flips the outline inward and `--_focusVisible-behavior: inset` insets a user-provided box-shadow. Both techniques adapt without the component reading the ring width, and a user's two-color (C40) box-shadow no longer clips there. Changing the inset on a specific component stays a `styleOverrides` escape hatch.
- The auto-on fallback ADR supersedes the deferred half of this record when it lands.
