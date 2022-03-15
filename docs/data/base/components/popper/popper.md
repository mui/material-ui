---
product: base
title: React Popper component
components: PopperUnstyled
githubLabel: 'component: Popper'
---

# Popper unstyled

<p class="description">A Popper can be used to display some content on top of another.</p>

Some important acknowledgements of the Popper component:

- 🕷 Popper relies on the 3rd party library ([Popper.js v2](https://popper.js.org/docs/v2/)) for perfect positioning.
- 💄 It's an alternative API to [react-popper](https://popper.js.org/react-popper/v2/). It aims for simplicity.
- 📦 [8 kB gzipped](/size-snapshot).
- The children is the [`Portal`](/base/react-portal/) prepended to the body of the document to avoid rendering problems.
  You can disable this behavior with `disablePortal` prop.
- The scroll isn't blocked when the popper open.
- The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/base/react-click-away-listener/)
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic Popper

By default, the popper is mounted to the DOM when it receives `open` prop as `true` and is removed from the DOM when `open` is `false`. If you want to implement a transition, use `keepMounted` prop (see [Transition](#transition) example below).

{{"demo": "SimplePopper.js"}}

## Placement

The default placement of the popper is `bottom`. You can simply change it with `placement` prop.

{{"demo": "PlacementPopper.js"}}
