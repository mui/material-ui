---
title: Material UI v9 – primitives and platform updates
description: A closer look at Material UI’s primitives and platform changes in v9, with highlights from the first prereleases.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'Product']
manualCard: false
---

v9 is the next major version of Material UI.
Across the first prereleases, we’re focusing on safer defaults, refined theming primitives, and clean‑ups that prepare the library for the long run.

For the big‑picture story across the whole ecosystem—including MUI X, Scheduler, and Chatbox—see the [v9 shared major version overview](/blog/mui-v9-major-version-cycle/).

## Highlights by prerelease

### v9.0.0-alpha.0 – preparing the foundations

**Theme: generate `color-mix` values for CSS variables**

In the first prerelease, we extended the CSS variables system to **generate `color-mix()` values** on top of the default Material UI theme variables.
This gives you:

- More precise control over **derived colors**.
- Better integration with design systems that already rely on `color-mix()` for overlays and surfaces.
- A path to future optimizations where the theme can **encode more semantics into variables** rather than relying on ad‑hoc runtime logic.

**Docs: clearer tooltip triggers and `nativeColor` fixes**

- Tooltip documentation now **describes the visible text triggers** more explicitly, clarifying which interactions and DOM structures are supported.
- We also **fixed the `nativeColor` docs** to better reflect how it behaves alongside the CSS variables system.

**Internal: preparing libraries for the first v9 prerelease**

Behind the scenes, we invested in **internal prep work** so the codebase could handle the v9 cycle smoothly:

- Versioning and build changes needed for the first v9 prerelease.
- Internal adjustments that reduce friction for future breaking‑change work.

### v9.0.0-alpha.1 – interaction and accessibility refinements

v9.0.0‑alpha.1 focuses on **small but important behavior changes**, especially around accessibility and event handling.

**Autocomplete**

- **Prevent menu opening on right‑click** so context‑menu interactions don’t unexpectedly toggle the options list.

**Backdrop**

- **Remove `aria-hidden` by default** so the backdrop is no longer aggressively hiding content from assistive technologies.

**ButtonBase**

- Ensure **`onClick` events propagate correctly when a non‑native button element is clicked**.

**Dialog and Modal**

- **Remove the `disableEscapeKeyDown` prop**.

**Grid**

- **Remove system props support** from the Grid component.

**Migration impact:** if you rely on system props directly on Grid, plan to migrate those concerns into `sx` or dedicated layout primitives as you move to v9.

**TableCell and theme – color mixing for borders**

- Apply **alpha before color mixing** for the `border-bottom` color when `nativeColor` and `cssVariables` are used together.

**Theme typing**

- **Remove `MuiTouchRipple` from theme component types**.

**Tooltip**

- Fix an error when **wrapping a disabled input that is focused**.

**`useAutocomplete` typing**

- Improve **TypeScript typing for `useAutocomplete`**.

### v9.0.0-alpha.2 – clean‑ups and infra work

v9.0.0‑alpha.2 invests in **cleanup and shared infra** to keep the library maintainable.

**Material UI**

- **Clean up duplicated CSS rules** to reduce redundancy and keep output styles more predictable.

**System**

- **Refactor the container query sorting regex** used in the system layer.

**Docs infra**

- **Move shared docs components to `@mui/docs`**, consolidating reusable pieces of the documentation system.

### v9.0.0-alpha.3 – navigation, accessibility, and Base UI integration

v9.0.0‑alpha.3 continues the focus on **accessibility, keyboard navigation, and Base UI integration**.

**New Menubar docs page with Base UI integration**

- Add a **new Menubar docs page**, integrated with **Base UI**.

**Improved keyboard navigation via Roving TabIndex**

- Improved **Roving TabIndex keyboard navigation** for **Stepper**, **Tabs**, and **MenuList**.
- Additional **accessibility improvements** for Stepper, MenuList, and Tabs.

**Autocomplete**

- Add a **`root` slot**.
- Support **full slots** for `clearIndicator` and `popupIndicator`.
- Fix the popup reopening when the window regains focus with `openOnFocus`.

**CSS rule cleanup (partial revert)**

- **Partially revert** duplicated CSS rules cleanup where it proved too aggressive.

**Repository note**

- As part of ongoing repository maintenance, we **removed Joy UI code and docs** from this repo.

## Migration and breaking changes

Because v9 is still in the prerelease stage, we expect some APIs to evolve before the final stable release.
However, several changes already have **migration impact** worth planning for:

- **Grid system props removal**: audit your usage of system props on Grid and migrate layout concerns into `sx` or dedicated layout primitives.
- **Dialog/Modal escape key behavior**: if you relied on `disableEscapeKeyDown`, plan to keep your escape‑handling logic in one place.
- **Theme typing clean‑ups**: if you depend on strongly typed theme extensions, keep an eye on updated type definitions as we continue to refine v9.

As the v9 cycle progresses, we’ll publish a dedicated v9 migration guide similar to the ones for [v6](/material-ui/migration/upgrade-to-v6/) and [v7](/material-ui/migration/upgrade-to-v7/).

## Where to go next

- [v9 shared major version overview](/blog/mui-v9-major-version-cycle/)
- [Data Grid v9 highlights](/blog/mui-x-v9-data-grid/)
- [Charts v9 highlights](/blog/mui-x-v9-charts/)
- [Scheduler (alpha) overview](/blog/mui-x-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/mui-x-v9-alpha-chatbox/)

