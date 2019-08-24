---
title: Componente React Portal
components: Portal
---

# Portal

<p class="description">O componente portal renderiza seu filho em uma nova sub-árvore fora da hierarquia do componente atual.</p>

- 📦 [1.3 kB gzipado](/size-snapshot)

O filho do componente portal será adicionado ao `container` especificado.

O componente é usado internamente pelos componentes [`Modal`](/components/modal/) e [`Popper`](/components/popper/). No servidor, o conteúdo não será renderizado. Você deve esperar pelo lado do cliente fazer a hidratação para ver o filho.

## Portal Simples

{{"demo": "pages/components/portal/SimplePortal.js"}}