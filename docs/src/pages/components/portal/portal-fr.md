---
title: React Portal component
components: Portal
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

- 📦 [1.3 kB gzippé](/size-snapshot)

Les enfants du composant Portal seront ajoutés au `container` fournit. Ce composant est utilisé en interne par les composants [`Modal`](/components/modal/) et [`Popper`](/components/popper/).

## Exemple

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.