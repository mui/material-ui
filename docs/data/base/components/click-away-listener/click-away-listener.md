---
productId: base-ui
title: Detect click outside React component
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
---

# Click-Away Listener

<p class="description">The Click-Away Listener component detects when a click event happens outside of its child element.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Click-Away Listener is a utility component that listens for click events outside of its child.
(Note that it only accepts _one_ child element.)

This is useful for components like the [Popper](/base-ui/react-popper/) which should close when the user clicks anywhere else in the document.

Click-Away Listener also supports the [Portal](/base-ui/react-portal/) component.

## Component

```jsx
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
```

The demo below shows how to hide a menu dropdown when users click anywhere else on the page:

{{"demo": "ClickAway.js"}}

### Usage with Portal

The following demo uses the [Portal](/base-ui/react-portal/) component to render the dropdown into a new subtree outside of the current DOM hierarchy:

{{"demo": "PortalClickAway.js"}}

## Customization

### Listening for leading events

By default, the Click-Away Listener component responds to **trailing events**—the _end_ of a click or touch.

You can set the component to listen for **leading events** (the start of a click or touch) using the `mouseEvent` and `touchEvent` props, as shown in the following demo:

{{"demo": "LeadingClickAway.js"}}

:::warning
When the component is set to listen for leading events, interactions with the scrollbar are ignored.
:::

## Accessibility

By default, Click-Away Listener will add an `onClick` handler to its child.
This can result in screen readers announcing that the child is clickable, even though this `onClick` handler has no effect on the child itself.

To prevent this behavior, add `role="presentation"` to the child element:

```tsx
<ClickAwayListener>
  <div role="presentation">
    <h1>non-interactive heading</h1>
  </div>
</ClickAwayListener>
```

This is also required to fix a known issue in NVDA when using Firefox that prevents the announcement of alert messages—see [mui/material-ui#29080](https://github.com/mui/material-ui/issues/29080) for details.
