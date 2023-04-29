---
product: base
title: React Popper component
components: Popper
githubLabel: 'component: Popper'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
---

# Popper

<p class="description">The Popper component lets you create tooltips and popovers that display information about an element on the page.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Popper is a utility component for creating various kinds of popups.
It relies on the third-party library ([Popper.js v2](https://popper.js.org/docs/v2/)) for positioning.

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Popper from '@mui/base/Popper';

export default function MyApp() {
  return <Popper>{/* the popper's content */}</Popper>;
}
```

### Basics

By default, the Popper is mounted to the DOM when its `open` prop is set to `true`, and removed from the DOM when `open` is `false`.

`anchorEl` is passed as the reference object to create a new `Popper.js` instance.
The children are placed in a [Portal](/base/react-portal/) prepended to the body of the document to avoid rendering problems.
You can disable this behavior with `disablePortal` prop.

The following demo shows how to create and style a basic popper.
Click **Toggle Popper** to see how it behaves:

{{"demo": "SimplePopper.js", "defaultCodeOpen": true}}

:::warning
By default, clicking outside the popper does not hide it.
If you need this behavior, you can use the [Click-Away Listener](/base/react-click-away-listener/) component.
:::

## Customization

### Placement

The popper's default placement is `bottom`.
You can change it using the `placement` prop.
Try changing this value to `top` in the interactive demo below to see how it works:

{{"demo": "PlacementPopper.js"}}

### Transitions

You can animate the open and close states of the popper with a render prop child and a transition component, as long as the component meets these conditions:

- Is a direct child descendant of the popper
- Calls the `onEnter` callback prop when the enter transition starts
- Calls the `onExited` callback prop when the exit transition is completed

These two callbacks allow the popper to unmount the child content when closed and fully transitioned.
