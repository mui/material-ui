---
title: Componente React Portal
components: Portal
---

# Portal

<p class="description">O componente portal renderiza seu filho em uma nova sub-árvore fora da hierarquia do componente atual.</p>

- 

O filho do componente portal será adicionado ao `container` especificado.

O componente é usado internamente pelos componentes [`Modal`](/components/modal/) e [`Popper`](/components/popper/). No servidor, o conteúdo não será renderizado. You have to wait for the client-side hydration to see the children.

## Portal Simples

{{"demo": "pages/components/portal/SimplePortal.js"}}