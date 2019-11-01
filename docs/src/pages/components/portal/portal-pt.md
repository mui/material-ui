---
title: Componente React Portal
components: Portal
---

# Portal

<p class="description">O componente portal renderiza seu filho em uma nova sub-árvore fora da hierarquia do componente atual.</p>

- 📦 [1.3 kB gzipado](/size-snapshot)

The children of the portal component will be appended to the `container` specified. The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Exemplo

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [não suporta](https://github.com/facebook/react/issues/13097) a API [`createPortal()`](https://reactjs.org/docs/portals.html) no servidor. You have to wait for the client-side hydration to see the children.