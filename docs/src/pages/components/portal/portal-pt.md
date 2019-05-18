---
title: Componente React Modal
components: Portal
---

# Portal

<p class="description">O componente portal renderiza seu filho em uma nova sub-árvore fora da hierarquia do componente atual.</p>

O filho do componente portal será adicionado ao `container` especificado.

O componente é usado internamente pelos componentes [`Modal`](/utils/modal/) e [`Popper`](/utils/popper/). No servidor, o conteúdo não será renderizado. Você deve esperar pelo lado do servidor fazer o `hydration` para ver o filho.

## Simples Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}