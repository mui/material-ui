---
productId: base-ui
title: React Popper component
components: Popper
githubLabel: 'component: Popper'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
---

# Popper

<p class="description">The Popper component lets you create tooltips and popovers that display information about an element on the page.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Popper is a utility component for creating various kinds of popups.
It relies on the third-party library ([Popper.js v2](https://popper.js.org/docs/v2/)) for positioning.

:::warning
The Popper.js library is no longer maintained.
It has been replaced by a new library: [Floating UI](https://floating-ui.com/).

Base UI offers the [Popup](/base-ui/react-popup/) component based on this new library.
It has features and an API similar to the Popper component, but is still in development and its API may change.

Once the [Popup](/base-ui/react-popup/) is stable, we will deprecate and, later, remove our Popper component.
:::

## Component

```jsx
import { Popper } from '@mui/base/Popper';
```

By default, the Popper is mounted to the DOM when its `open` prop is set to `true`, and removed from the DOM when `open` is `false`.

`anchorEl` is passed as the reference object to create a new `Popper.js` instance.
The children are placed in a [Portal](/base-ui/react-portal/) prepended to the body of the document to avoid rendering problems.
You can disable this behavior with `disablePortal` prop.

The following demo shows how to create and style a basic Popper.
Click **Toggle Popper** to see how it behaves:

{{"demo": "UnstyledPopperBasic", "defaultCodeOpen": true}}

:::warning
By default, clicking outside the popper does not hide it.
If you need this behavior, you can use the [Click-Away Listener](/base-ui/react-click-away-listener/) component.
:::

## Customization

### Placement

The Popper's default placement is `bottom`.
You can change it using the `placement` prop.
Try changing this value to `top` in the interactive demo below to see how it works:

{{"demo": "PlacementPopper.js"}}

### Transitions

You can animate the open and close states of the Popper with a render prop child and a transition component, as long as the component meets these conditions:

- Is a direct child descendant of the Popper
- Calls the `onEnter` callback prop when the enter transition starts
- Calls the `onExited` callback prop when the exit transition is completed

These two callbacks allow the Popper to unmount the child content when closed and fully transitioned.
