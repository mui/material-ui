---
title: Componente React Portal
components: Portal
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

- 📦 [1.3 kB gzipado](/size-snapshot)

O filho do componente portal será adicionado ao `container` especificado. O componente é usado internamente pelos componentes [`Modal`](/components/modal/) e [`Popper`](/components/popper/).

## Exemplo

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [não suporta](https://github.com/facebook/react/issues/13097) a API [`createPortal()`](https://reactjs.org/docs/portals.html) no servidor. Você deve esperar pelo lado do cliente fazer a hidratação para ver o filho.