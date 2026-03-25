---
title: Material UI v9 primitives
description: Material UI v9 primitives for developers: theming, accessibility, keyboard navigation, performance, and new Base UI–powered additions.
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'Product']
manualCard: false
hideFromHomeList: true
---

Material UI v9 is here.
This release focuses on what developers feel immediately: better accessibility defaults, more reliable keyboard navigation, and theming primitives that make CSS integration smoother.

For the v9 ecosystem story across MUI X, Scheduler, and Chatbox, see the [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [NumberField](#numberfield)
- [Menubar](#menubar)
- [Theme and CSS variables](#theme-and-css-variables)
- [Interaction and accessibility fixes](#interaction-and-accessibility-fixes)
- [Platform cleanup](#platform-cleanup)
- [Keyboard navigation](#keyboard-navigation)
- [Migration and breaking changes](#migration-and-breaking-changes)

## NumberField

[Base UI](https://base-ui.com/) adoption is expanding across Material UI: for now through component recipes, with more native Material UI surfaces to follow. **`NumberField`** is the first new primitive in this cycle built on that stack: a focused control for numeric input with consistent accessibility and styling hooks.

<figure>
  <!-- feature-media:video NumberField -->
  <video
    autoplay
    muted
    loop
    playsinline
    width="992"
    height="562"
    controls
    style="border: 0; width: 100%; max-width: 992px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-mui-v9-primitives/NumberField.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>NumberField, implemented on Base UI primitives.</figcaption>
</figure>

## Menubar

**`Menubar`** is the other new Base UI–backed surface in v9: a horizontal menu bar pattern with strong keyboard support, aligned with how menus and navigation are modeled in [Base UI](https://base-ui.com/). We also shipped a dedicated Menubar documentation page, integrated with those primitives (alpha.3).

<figure>
  <!-- feature-media:video Menubar -->
  <video
    autoplay
    muted
    loop
    playsinline
    width="1462"
    height="998"
    controls
    style="border: 0; width: 100%; max-width: 1462px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-mui-v9-primitives/Menubar.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>Menubar: horizontal menus and roving keyboard focus.</figcaption>
</figure>

Together, NumberField and Menubar embody the v9 push toward roving TabIndex and predictable keyboard interactions across complex controls.

## Theme and CSS variables

### Derived colors with `color-mix()`

Theme in v9 extends the CSS variables system to generate `color-mix()` values on top of the default Material UI theme variables (alpha.0).
This gives you:

- More precise control over derived colors.
- Better integration with design systems that already rely on `color-mix()` for overlays and surfaces.
- A path to future optimizations where the theme can encode more semantics into variables rather than relying on ad‑hoc runtime logic.

### Tooltip docs clarity and `nativeColor` fixes

- Tooltip documentation now describes the visible text triggers more explicitly, clarifying which interactions and DOM structures are supported (alpha.0).
- We also fixed the `nativeColor` docs to better reflect how it behaves alongside the CSS variables system.

Internal: preparing libraries for the v9 cycle

Behind the scenes, we invested in internal prep work so the codebase could handle the v9 cycle smoothly:

- Versioning and build changes needed for the v9 cycle.
- Internal adjustments that reduce friction for future breaking‑change work.

## Interaction and accessibility fixes

These updates focus on small but important behavior changes, especially around accessibility and event handling (alpha.1).

### Autocomplete, Backdrop, Tooltip

Autocomplete

- Prevent menu opening on right‑click so context‑menu interactions don’t unexpectedly toggle the options list (alpha.1).

Backdrop

- Remove `aria-hidden` by default so the backdrop is no longer aggressively hiding content from assistive technologies (a11y improvements; @Silviu Alexandru Avram can add more details) (alpha.1).

ButtonBase

- Ensure `onClick` events propagate correctly when a non‑native button element is clicked (alpha.1).

Dialog and Modal

- Remove the `disableEscapeKeyDown` prop (alpha.1).

Grid

- Remove system props support from the Grid component (alpha.1).

Migration impact: if you rely on system props directly on Grid, plan to migrate those concerns into `sx` or dedicated layout primitives as you move to v9.

TableCell and theme – color mixing for borders

- Apply alpha before color mixing for the `border-bottom` color when `nativeColor` and `cssVariables` are used together (alpha.1).

Theme typing

- Remove `MuiTouchRipple` from theme component types (alpha.1).

Tooltip

- Fix an error when wrapping a disabled input that is focused (alpha.1).

`useAutocomplete` typing

- Improve TypeScript typing for `useAutocomplete` (alpha.1).

## Platform cleanup

Platform cleanup and docs infrastructure in v9 focus on cleanup, maintainability, and more efficient developer workflows (alpha.2).

Material UI

- Clean up duplicated CSS rules to reduce redundancy and keep output styles more predictable (alpha.2).

- Bundle size improvements credited to @Siriwat Kunaporn (alpha.2).

- `sx` prop performance improvements (details in PR https://github.com/mui/material-ui/pull/44254) (alpha.2).

System

- Refactor the container query sorting regex used in the system layer (alpha.2).

Docs infra

- Move shared docs components to `@mui/docs`, consolidating reusable pieces of the documentation system (alpha.2).

## Keyboard navigation

Keyboard navigation and accessibility improvements keep moving the ecosystem forward (alpha.3).

### Roving TabIndex across menus and navigation

- Improved Roving TabIndex keyboard navigation for Stepper, Tabs, and MenuList (alpha.3).
- Additional accessibility improvements for Stepper, MenuList, and Tabs (alpha.3).

Improved roving TabIndex focus is a key v9 highlight for keyboard-first components like Menu, Stepper, and Tabs.

### Autocomplete

- Add a `root` slot (alpha.3).
- Support full slots for `clearIndicator` and `popupIndicator` (alpha.3).
- Fix the popup reopening when the window regains focus with `openOnFocus` (alpha.3).

### CSS rule cleanup (partial revert)

- Partially revert duplicated CSS rules cleanup where it proved too aggressive (alpha.3).

### Repository note

- As part of ongoing repository maintenance, we removed Joy UI code and docs from this repo (alpha.3).

## Migration and breaking changes

In v9, we removed deprecated props and shipped fixes that sometimes require breaking changes, especially where those fixes unlock consistent accessibility and improved keyboard navigation through stronger Roving TabIndex behavior.
Several changes already have migration impact worth planning for:

- **Grid system props removal:** audit your usage of system props on Grid and migrate layout concerns into `sx` or dedicated layout primitives.
- **Dialog/Modal escape key behavior:** if you relied on `disableEscapeKeyDown`, plan to keep your escape‑handling logic in one place.
- **Theme typing clean‑ups:** if you depend on strongly typed theme extensions, keep an eye on updated type definitions as we continue to refine v9.

As the v9 cycle progresses, we’ll publish a dedicated v9 migration guide similar to the ones for [v6](/material-ui/migration/upgrade-to-v6/) and [v7](/material-ui/migration/upgrade-to-v7/).

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Data Grid highlights](/blog/introducing-mui-v9-data-grid/)
- [Charts highlights](/blog/introducing-mui-v9-charts/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chatbox (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

