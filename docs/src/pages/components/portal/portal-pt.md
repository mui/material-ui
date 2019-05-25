---
title: Componente React Portal
components: Portal
---

# Portal

<p class="description">O componente portal renderiza seu filho em uma nova sub-árvore fora da hierarquia do componente atual.</p>

O filho do componente portal será adicionado ao `container` especificado.

The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components. No servidor, o conteúdo não será renderizado. Você deve esperar pelo lado do cliente fazer o `hydration` para ver o filho.

## Simples Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}