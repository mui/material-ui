---
title: Portal React component
components: Portal
---

# Portal

<p class="description">El componente del portal hace que sus hijos se conviertan en un nuevo "subtree" fuera de la jerarquía actual de componentes.</p>

- 📦 [1.3 kB comprimido](/size-snapshot)

The children of the portal component will be appended to the `container` specified. The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Ejemplo

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.