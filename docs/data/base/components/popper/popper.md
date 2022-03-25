---
product: base
title: React Popper component
components: PopperUnstyled
githubLabel: 'component: Popper'
---

# Unstyled popper

<p class="description">The Popper component lets you create components that are displayed on top of other elements.</p>

Some important acknowledgements of the Popper component:

- 🕷 Popper relies on the 3rd party library ([Popper.js v2](https://popper.js.org/docs/v2/)) for perfect positioning.
- 💄 It's an alternative API to [react-popper](https://popper.js.org/react-popper/v2/). It aims for simplicity.
- 📦 [8 kB gzipped](/size-snapshot).
- The children are placed in a [`Portal`](/base/react-portal/) prepended to the body of the document to avoid rendering problems.
  You can disable this behavior with `disablePortal` prop.
- The page scroll isn't blocked when the popper opens.
- The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/base/react-click-away-listener/)
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic Popper

By default, the popper is mounted to the DOM when it receives `open` prop as `true` and then is removed from it when `open` turns `false`. If you want that to happen with a transition, use the `keepMounted` prop (see the [Transition](#transition) example below).

{{"demo": "SimplePopper.js"}}

## Placement

The popper's default placement is `bottom`. You can change it using the `placement` prop. Play around with the interactive demo below to see the many possible values there are for it.

{{"demo": "PlacementPopper.js"}}
