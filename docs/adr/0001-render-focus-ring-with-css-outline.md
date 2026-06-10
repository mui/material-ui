---
status: accepted
---

# Render the focus ring with CSS `outline`

The focus-ring experiment draws its ring with `outline` + `outline-offset`, not `box-shadow` or an `::after` pseudo-element.

Decisive reasons: (1) the ring is an **accessibility** feature, and in Windows High Contrast / `forced-colors` mode the OS discards `box-shadow` and pseudo-element backgrounds but preserves `outline` — the indicator must not vanish in the highest-need a11y mode; (2) `Button` and `Fab` already animate `box-shadow: shadows[6]` on `Mui-focusVisible` (Button.js:133, Fab.js:81), so a box-shadow ring would collide with that elevation, whereas `outline` sits orthogonally. `outline` also has zero layout shift, follows `border-radius` in all evergreen browsers, and maps 1:1 onto the theme key (`color`→`outline-color`, `width`→`outline-width`, `offset`→`outline-offset`).

## Considered Options

- **`box-shadow` spread** — rejected: stripped in forced-colors mode; collides with existing elevation box-shadows on Button/Fab.
- **`::after` pseudo-element** — rejected: stripped in forced-colors mode; requires `position: relative` on the host and bespoke geometry.

## Consequences

- Overrides the existing `outline: 0` on `ButtonBase` (ButtonBase.js:47).
- An ancestor `overflow: hidden` can clip the outline (true of all three options; accepted).
