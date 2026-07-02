---
status: accepted
---

# Focus-ring model: auto-on a11y fallback + tri-state `theme.focusVisible`

The focus ring is exposed as **two features sharing one renderer**, controlled by `theme.focusVisible` plus the resolved `disableRipple`:

- **Feature 1 — a11y fallback (on by default).** When `disableRipple` is true (any source: theme `defaultProps` or per-instance), ButtonBase renders a focus ring. This is a **default behavior change**: today `disableRipple` removes the only keyboard-focus indicator for ripple-pulse components (Button, IconButton, Fab, Tab, …), failing WCAG 2.4.7. The fallback uses default ring values (`outlineColor: palette.primary.main`, `outlineWidth: 2`, `outlineOffset: 2`, `outlineStyle: 'solid'`). It does not key off `focusRipple`.
- **Feature 2 — opt-in theme.** `theme.focusVisible` is tri-state: `undefined` ⇒ feature 1 only; an **object** ⇒ ring appears regardless of ripple state (object presence is the opt-in, fields fill from defaults); **`false`** ⇒ hard kill-switch, no ring at all including the fallback. The object is typed as the outline subset of `React.CSSProperties` (`outlineColor`/`outlineWidth`/`outlineOffset`/`outlineStyle`) and is spread directly onto the `Mui-focusVisible` styles — no field-name mapping.

When both apply, feature 2's values win (the fallback is just the themed ring with defaults).

## Why this shape

- **Auto-on, not opt-in, for feature 1:** a safety-net that must be explicitly enabled would not be a safety-net — most teams that set `disableRipple` would never know they removed their focus indicator.
- **Object-presence opt-in for feature 2:** lets us distinguish "user wants rings (even with ripple on)" from "user inherited defaults," which a always-present defaulted key could not.
- **`false` kill-switch:** an honest, discoverable escape for teams with their own focus design who want neither ripple nor the auto ring. (Per-style overrides via `styleOverrides` remain available for "different ring, not no ring.")

## Consequences

- Shipping this changes default rendering for any app that sets `disableRipple` — they gain a visible outline on keyboard focus. Intended, but a visual change to call out in release notes.
- Components whose focus indicator is a background tint (`palette.action.focus`: MenuItem, Chip, ListItemButton, …) get the ring **additively** on top of the tint when `disableRipple` is set app-wide.
- Scope is ButtonBase and its derived components; other focusable components (TextField, Checkbox, …) are out of scope for the experiment.
