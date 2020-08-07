---
title: Portal React component
components: Portal
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

The children of the portal component will be appended to the `container` specified.
The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Example

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server.
You have to wait for the client-side hydration to see the children.
