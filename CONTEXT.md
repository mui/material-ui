# Context: Focus Ring Experiment

Glossary for the focus-ring support experiment on Material UI. Definitions only — no implementation.

## Glossary

### Focus ring

A visible focus indicator rendered when a focusable component is keyboard-focused (`Mui-focusVisible`). Distinct from the **ripple**, which is separate, ripple-based feedback.

There are **two independent features** that each render a focus ring. They have separate triggers but share **one renderer**: the a11y fallback (feature 1) is the themed ring (feature 2) with default values. When both fire, **feature 2 wins** (explicit config beats defaults). Experiment scope: **ButtonBase and its derived components**.

### A11y focus-ring fallback (feature 1)

Automatic ring shown when the ripple is disabled. The trigger is the **resolved** `disableRipple` value (`ownerState.disableRipple === true`), regardless of source — theme `defaultProps` (any level) or a per-instance prop. It does **not** key off `focusRipple` (a button that never had a focus pulse is not auto-ringed). A defensive accessibility safety-net: when a component's keyboard-focus indicator was the ripple pulse, disabling the ripple leaves nothing, so MUI supplies a ring. Fires regardless of whether the focus-ring theme is configured. With no theme config, its color defaults to `theme.palette.primary.main`.

For components whose focus indicator is a background tint (`palette.action.focus`) rather than the ripple, the fallback ring is **additive** — ring on top of the existing tint.

### Focus-ring theme (feature 2)

An opt-in styling feature: configuring the focus-ring theme key makes a focus ring appear. A deliberate design-system choice. Works **regardless of ripple state** — the ring appears even while the ripple is enabled (ring and ripple coexist on focus).

The key is `theme.focusRing`, which is **tri-state**:

- **`undefined`** (default) — feature 2 off (no ring while ripple is on); feature 1 still active (a11y fallback rings on `disableRipple`, using the default values below).
- **object** — feature 2 on: ring appears regardless of ripple state. Object *presence* is the opt-in (not any specific field). Feature 1 also adopts these values.
- **`false`** — hard kill-switch: no ring ever, **including** the a11y fallback. An explicit, discoverable way to opt out of the safety-net.

The object is typed as the outline subset of `React.CSSProperties` — `outlineColor`, `outlineWidth`, `outlineOffset`, `outlineStyle` — and is **spread directly** onto the `Mui-focusVisible` styles over the defaults (`outlineStyle: 'solid'`, `outlineColor: palette.primary.main`, `outlineWidth: 2`, `outlineOffset: 2`). No field-name mapping. Numbers mean px.

The ring is baked into **ButtonBase core** (the safety-net only works as default behavior). Customization beyond the theme key is free via `MuiButtonBase`/`MuiButton…` `styleOverrides`, which apply after the root and win.

### Ripple

The existing `TouchRipple` feedback on `ButtonBase`. Today it is the only focus indicator on button-like components, and only when `focusRipple` is enabled and `disableRipple` is not set.
