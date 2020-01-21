---
title: Composant React Téléportation
components: Portal
---

# Portal

<p class="description">Le composant de portail convertit ses enfants en un nouveau "sous-arbre" en dehors de la hiérarchie de composants actuelle.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

Les enfants du composant Portal seront ajoutés au `container` fournit. The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Exemple

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.