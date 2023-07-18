---
productId: base-ui
title: React Popup component
components: Popup
githubLabel: 'component: popup'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
---

# Popup

<p class="description">The Popup component is a utility that lets you display content in tooltips and popovers.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Popper is a utility component for creating various kinds of popups.
It relies on the [Floating UI](https://floating-ui.com/) third-party library for positioning.

:::info
Base UI also contains the [Popper](/base-ui/react-popper/) component with a very similar API.
It's based on the [Popper](https://popper.js.org/) library, which is in maintenance mode and it's deprecated itself.

We recommend using the Popup component instead.
:::

## Component

### Usage

After [installation](/base-ui/getting-started/quickstart/#installation), you can start building with this component using the following basic elements:

```jsx
import Popup from '@mui/base/Popup';

export default function MyApp() {
  return <Popup>{/* the popup's content */}</Popup>;
}
```

### Basics

By default, the Popup is mounted to the DOM when its `open` prop is set to `true`, and removed from the DOM when `open` is `false`.

`anchor` is passed as the reference element to the Floating UI's [`useFloating`](https://floating-ui.com/docs/react#positioning) hook.
The children are placed in a [Portal](/base-ui/react-portal/) prepended to the body of the document to avoid rendering problems.
You can disable this behavior with `disablePortal` prop.

The following demo shows how to create and style a basic popup.
Click **Toggle Popup** to see how it behaves:

{{"demo": "SimplePopup.js", "defaultCodeOpen": true}}

:::warning
By default, clicking outside the popup does not hide it.
If you need this behavior, you can use the [Click-Away Listener](/base-ui/react-click-away-listener/) component.
:::

## Customization

### Placement

The Popup's default placement is `bottom`.
You can change it using the `placement` prop.
Try changing this value to `top` in the interactive demo below to see how it works:

{{"demo": "Placement.js", "defaultCodeOpen": false }}

### Transitions

You can animate the open and close states of the Popup with a render prop child and a transition component, as long as the component meets these conditions:

- is a direct child descendant of the Popup,
- calls the `onExited` callback prop when the exit transition is completed.

These two callbacks allow the Popup to unmount the child content when closed and fully transitioned.

{{"demo": "AnimatedPopup.js"}}
