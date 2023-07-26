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
It's based on the [Popper](https://popper.js.org/) library, which is in maintenance mode.

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

You can animate opening and closing of the Popup using CSS transitions, CSS animations, or third party animation libraries.

To enable transitions, first of all, set the `withTransition` prop.
It will make the Popup wait for the exit animation to finish before unmounting.

Then, instead of placing the Popup contents directly as its children, wrap them in a function that receives an object with `requestOpen: boolean` and `onExited: () => void` fields.

Run the open transition when `requestOpen` becomes `true` and the close transition when it changes to `false`.
When the exit transition finishes, call the provided `onExited` function to let the Popup know it can be unmounted.

If using CSS transitions or animations, you can use the `onTransitionEnd`/`onAnimationEnd` events to detect when the transition is over.

{{"demo": "AnimatedPopup.js"}}

### Floating UI middleware

If you need to modify the underlying [Floating UI middleware](https://floating-ui.com/docs/middleware), you can do so via the `middleware` prop.
By default, the Popup uses [`offset`](https://floating-ui.com/docs/offset) (with the value provided in the `offset` prop) and [`flip`](https://floating-ui.com/docs/flip) functions.
If you provide your own middleware array, these defaults won't be applied.
