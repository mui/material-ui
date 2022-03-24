---
product: base
title: React Portal component
components: Portal
githubLabel: 'component: Portal'
packageName: '@mui/base'
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of the current DOM hierarchy.</p>

The children of the portal component will be appended to the `container` specified.
The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Example

{{"demo": "SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server.
You have to wait for the client-side hydration to see the children.
