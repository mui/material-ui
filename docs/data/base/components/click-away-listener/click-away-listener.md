---
product: base
title: React ClickAwayListener component
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
packageName: '@mui/base'
---

# Click-away listener

<p class="description">The <code>ClickAwayListener</code> component detects when a click event happens outside of its child element.</p>

`ClickAwayListener` is a utility component that listens for click events outside of its child.

> **Note:** the `ClickAwayListener` component only accepts _one_ child element.

This is useful for components like [`PopperUnstyled`](/base/react-popper/) which should close when the user clicks anywhere else in the document.

`ClickAwayListener` also supports the [`Portal` component](/base/react-portal/).

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic usage

The following demo shows how to hide a menu dropdown when users click anywhere else on the page:

{{"demo": "ClickAway.js"}}

## Portal

The following demo uses the [`Portal` component](/base/react-portal/) to render the dropdown into a new subtree outside of the current DOM hierarchy:

{{"demo": "PortalClickAway.js"}}

## Leading edge

By default, the `ClickAwayListener` component responds to **trailing events**—the _end_ of a click or touch.

You can set the component to listen for **leading events** (the start of a click or touch) using the `mouseEvent` and `touchEvent` props, as shown in the following demo:

{{"demo": "LeadingClickAway.js"}}

:::warning
⚠️ **Note:** when the component is set to listen for leading events, interactions with the scrollbar are ignored.
:::

## Accessibility

By default, `ClickAwayListener` will add an `onClick` handler to its child.
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

## Bundle size

📦 [981 B gzipped](/size-snapshot/).
