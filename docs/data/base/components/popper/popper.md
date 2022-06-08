---
product: base
title: Unstyled React Popper component
components: PopperUnstyled
githubLabel: 'component: Popper'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
packageName: '@mui/base'
---

# Unstyled popper

<p class="description">The `PopperUnstyled` component lets you create tooltips and popovers that display information about an element on the page.</p>

`PopperUnstyled` relies on the third-party library ([Popper.js v2](https://popper.js.org/docs/v2/)) for perfect positioning.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic popper

```js
import PopperUnstyled from '@mui/base/PopperUnstyled';
```

By default, the popper is mounted to the DOM when its `open` prop is set to `true`, and removed from the DOM when `open` turns `false`.

`anchorEl` is passed as the reference object to create a new `Popper.js` instance.
The children are placed in a [`Portal`](/base/react-portal/) prepended to the body of the document to avoid rendering problems.
You can disable this behavior with `disablePortal` prop.

{{"demo": "SimplePopper.js", "defaultCodeOpen": true}}

**Note:** clicking outside the popper does not hide it. If you need this behavior, you can use the [`ClickAwayListener`](/base/react-click-away-listener/) component.

## Placement

The popper's default placement is `bottom`. You can change it using the `placement` prop. Try changing this value to `top` in the interactive demo below to see how it works:

{{"demo": "PlacementPopper.js"}}

## Transitions

You can animate the open and close states of the popper with a render prop child and a transition component, as long as the component meets these conditions:

- Is a direct child descendent of the popper
- Calls the `onEnter` callback prop when the enter transition starts
- Calls the `onExited` callback prop when the exit transition is completed

These two callbacks allow the popper to unmount the child content when closed and fully transitioned.

## Bundle size

📦 [8.1 kB gzipped](/size-snapshot/).
