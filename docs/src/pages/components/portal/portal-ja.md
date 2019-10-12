---
title: Portal React component
components: Portal
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current component hierarchy.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

The children of the portal component will be appended to the `container` specified. The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## 例

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React は、サーバー上の [`createPortal（）`](https://reactjs.org/docs/portals.html) APIを[サポートしません。](https://github.com/facebook/react/issues/13097) You have to wait for the client-side hydration to see the children.