---
product: base
title: React Portal component
components: Portal
githubLabel: 'component: Portal'
packageName: '@mui/base'
---

# Portal

<p class="description">The <code>Portal</code> component renders its children into a new subtree outside of the current DOM hierarchy.</p>

The children of the `Portal` component will be appended to the specified container.

This component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic usage

{{"demo": "SimplePortal.js"}}

> ⚠️ **Note:** React [does not support](https://github.com/facebook/react/issues/13097) the [`createPortal()` API on the server](https://reactjs.org/docs/portals.html)—client-side hydration is necessary to render the children elements.
