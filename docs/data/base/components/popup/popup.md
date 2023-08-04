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
It relies on the third-party [Floating UI](https://floating-ui.com/) library for positioning.

:::info
The Popup component, once stable, is intended to replace the [Popper](/base-ui/react-popper/) component, which will be phased out in a future release of Base UI.
:::

## Component

### Usage

After [installation](/base-ui/getting-started/quickstart/#installation), you can start building with this component using the following basic elements:

```jsx
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';

export default function MyApp() {
  return <Popup>{/* the popup's content */}</Popup>;
}
```

### Basics

By default, the Popup is mounted to the DOM when its `open` prop is set to `true`, and removed from the DOM when `open` is `false`.

`anchor` is passed as the reference element to Floating UI's [`useFloating`](https://floating-ui.com/docs/react#positioning) hook.
The children are placed in a [Portal](/base-ui/react-portal/) prepended to the body of the document to avoid rendering problems.
You can disable this behavior with `disablePortal` prop.
See how it's done in the [Disable portal](#disable-portal) section below.

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

You can animate the opening and closing of the Popup using CSS transitions, CSS animations, or third-party animation libraries.

To enable transitions, first set the `withTransition` prop.
This will make the Popup wait for the exit animation to finish before unmounting.

Then, instead of placing the Popup contents directly as its children, wrap them in a function that receives an object with `requestOpen: boolean` and `onExited: () => void` fields.

Run the open transition when `requestOpen` becomes `true` and the close transition when it changes to `false`.
When the exit transition finishes, call the provided `onExited` function to let the Popup know it can be unmounted.

If using CSS transitions or animations, you can use the `onTransitionEnd` or `onAnimationEnd` events, respectively, to detect when the transition is over.

{{"demo": "AnimatedPopup.js"}}

### Disable portal

To render the Popup where it's defined in the source, without using [React portals](https://react.dev/reference/react-dom/createPortal), pass in the `disablePortal` prop.
Note that it may cause visual clipping if a Popup is placed in a container without visible overflow.

You can use fixed positioning to prevent clipping when not using portals.
The Popup has the `strategy` prop which is responsible for determining how the position is calculated.
When set to `"fixed"`, the fixed CSS position will be used and the Popup won't be subject to overflow hiding.

{{"demo": "DisabledPortalPopup.js"}}

### Floating UI middleware

If you need to modify the underlying [Floating UI middleware](https://floating-ui.com/docs/middleware), you can do so via the `middleware` prop.
By default, the Popup uses the [`offset`](https://floating-ui.com/docs/offset) (with the value provided in the `offset` prop) and [`flip`](https://floating-ui.com/docs/flip) functions.
If you provide your own middleware array, these defaults won't be applied.
