---
title: Material UI v9
description: 'Material UI v9 for developers: theming, accessibility, keyboard navigation, performance, and new Base UI-powered additions.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'Product']
manualCard: false
---

Material UI v9 is here.
This release focuses on what developers feel immediately: better accessibility defaults, more reliable keyboard navigation, and theming foundations that make CSS integration smoother.

For the v9 ecosystem story across MUI X, Scheduler, and Chatbox, see the [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [NumberField](#numberfield)
- [Menubar and submenus](#menubar-and-submenus)
- [Theme and CSS variables](#theme-and-css-variables)
  - [Derived colors with `color-mix()`](#derived-colors-with-color-mix)
  - [Tooltip docs clarity and `nativeColor` fixes](#tooltip-docs-clarity-and-nativecolor-fixes)
- [Interaction and accessibility fixes](#interaction-and-accessibility-fixes)
  - [Autocomplete, Backdrop, Tooltip](#autocomplete-backdrop-tooltip)
- [Platform cleanup](#platform-cleanup)
- [Keyboard navigation](#keyboard-navigation)
  - [Roving TabIndex across menus and navigation](#roving-tabindex-across-menus-and-navigation)
  - [Autocomplete](#autocomplete)
  - [CSS rule cleanup (partial revert)](#css-rule-cleanup-partial-revert)
  - [Repository note](#repository-note)
- [Migration and breaking changes](#migration-and-breaking-changes)
- [Where to go next](#where-to-go-next)

## NumberField

Base UI adoption is expanding across Material UI: for now through component recipes, with more native Material UI surfaces to follow.
`NumberField` is the first new primitive in this cycle built on that stack: a focused control for numeric input with consistent accessibility and styling hooks.

<figure>
  <video
    autoplay
    muted
    loop
    playsinline
    width="992"
    height="562"
    controls
    style="border: 0; width: 100%; max-width: 496px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-material-ui-v9/NumberField.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>NumberField, implemented on Base UI.</figcaption>
</figure>

See the [NumberField](/material-ui/react-number-field/) documentation for API details and examples.

## Menubar and submenus

`Menubar` is the other new Base UI-backed surface in v9: a horizontal menu bar pattern with strong keyboard support, aligned with how menus and navigation are modeled in Base UI.
On this stack, we can finally support submenus, nested menus off the bar, instead of stopping at a single-level strip.

<figure>
  <video
    autoplay
    muted
    loop
    playsinline
    width="1462"
    height="998"
    controls
    style="border: 0; width: 100%; max-width: 731px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-material-ui-v9/Menubar.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>Menubar with submenus and keyboard-friendly navigation.</figcaption>
</figure>

Together, NumberField and Menubar show where we're headed in v9: wider Base UI adoption in Material UI, and interactions, including keyboard support, that stay clear and consistent even in dense UIs.

See the [Menubar](/material-ui/react-menubar/) documentation for API details and examples.

## Theme and CSS variables

### Derived colors with `color-mix()`

Theme in v9 extends the CSS variables system to generate `color-mix()` values on top of the default Material UI theme variables.
This gives you:

- More precise control over derived colors.
- Better integration with design systems that already rely on `color-mix()` for overlays and surfaces.
- A path to future optimizations where the theme can encode more semantics into variables rather than relying on ad‑hoc runtime logic.

### Tooltip docs clarity and `nativeColor` fixes

- Tooltip documentation now describes the visible text triggers more explicitly, clarifying which interactions and DOM structures are supported.
- We also fixed the `nativeColor` docs to better reflect how it behaves alongside the CSS variables system.

Current behavior and props are documented on the [Tooltip](/material-ui/react-tooltip/) page.

Internal: preparing libraries for the v9 cycle

Behind the scenes, we invested in internal prep work so the codebase could handle the v9 cycle smoothly, including versioning and build changes for the v9 cycle, plus internal adjustments that reduce friction for future breaking‑change work.

## Interaction and accessibility fixes

These updates focus on small but important behavior changes, especially around accessibility and event handling.

### Autocomplete, Backdrop, Tooltip

Autocomplete

- Prevent menu opening on right-click so context-menu interactions don't unexpectedly toggle the options list.

Backdrop

- Remove `aria-hidden` by default so the backdrop is no longer aggressively hiding content from assistive technologies (a11y improvements).

ButtonBase

- Ensure `onClick` events propagate correctly when a non‑native button element is clicked.

Dialog and Modal

- Remove the `disableEscapeKeyDown` prop.

Grid

- Remove system props support from the Grid component.

Migration impact: if you rely on system props directly on Grid, plan to migrate those concerns into `sx` or dedicated layout primitives as you move to v9.

TableCell and theme – color mixing for borders

- Apply alpha before color mixing for the `border-bottom` color when `nativeColor` and `cssVariables` are used together.

Theme typing

- Remove `MuiTouchRipple` from theme component types.

Tooltip

- Fix an error when wrapping a disabled input that is focused.

`useAutocomplete` typing

- Improve TypeScript typing for `useAutocomplete`.

## Platform cleanup

Platform cleanup and docs infrastructure in v9 focus on cleanup, maintainability, and more efficient developer workflows.

Material UI

- Clean up duplicated CSS rules to reduce redundancy and keep output styles more predictable.

- Bundle size improvements.

- `sx` prop performance improvements (details in PR https://github.com/mui/material-ui/pull/44254).

System

- Refactor the container query sorting regex used in the system layer.

Docs infra

- Move shared docs components to `@mui/docs`, consolidating reusable pieces of the documentation system.

## Keyboard navigation

Keyboard navigation and accessibility improvements keep moving the ecosystem forward.

### Roving TabIndex across menus and navigation

- Improved Roving TabIndex keyboard navigation for Stepper, Tabs, and MenuList.
- Additional accessibility improvements for Stepper, MenuList, and Tabs.

Improved roving TabIndex focus is a key v9 highlight for keyboard-first components like Menu, Stepper, and Tabs.

### Autocomplete

- Add a `root` slot.
- Support full slots for `clearIndicator` and `popupIndicator`.
- Fix the popup reopening when the window regains focus with `openOnFocus`.

### CSS rule cleanup (partial revert)

- Partially revert duplicated CSS rules cleanup, where it proved too aggressive.

### Repository note

- As part of ongoing repository maintenance, we removed Joy UI code and docs from this repo.

## Migration and breaking changes

In v9, we removed deprecated props and shipped fixes that sometimes require breaking changes, especially where those fixes unlock consistent accessibility and improved keyboard navigation through stronger Roving TabIndex behavior.
Several changes already have migration impact worth planning for:

- Grid system props removal: audit your usage of system props on Grid and migrate layout concerns into `sx` or dedicated layout primitives.
- Dialog/Modal escape key behavior: if you relied on `disableEscapeKeyDown`, plan to keep your escape‑handling logic in one place.
- Theme typing clean‑ups: if you depend on strongly typed theme extensions, keep an eye on updated type definitions as we continue to refine v9.

For a consolidated upgrade path from Material UI v7, follow [Upgrade to v9](/material-ui/migration/upgrade-to-v9/).
Earlier majors are covered in the [v6](/material-ui/migration/upgrade-to-v6/) and [v7](/material-ui/migration/upgrade-to-v7/) upgrade guides.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [MUI X Data Grid](/blog/introducing-mui-x-data-grid-v9/)
- [MUI X Charts](/blog/introducing-mui-x-charts-v9/)
- [MUI X Tree View and Date and Time Pickers](/blog/introducing-mui-x-tree-view-and-pickers-v9/)
- [MUI X Scheduler (alpha)](/blog/introducing-mui-x-scheduler-v9-alpha/)
- [MUI X Chat (alpha)](/blog/introducing-mui-x-chat-v9-alpha/)

## We want your feedback

To share feedback or report issues, visit [mui/material-ui on GitHub](https://github.com/mui/material-ui).
