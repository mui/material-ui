---
title: Componente React para Detectar clique fora
components: ClickAwayListener
---

# Observador de Clique (ClickAwayListener)

<p class="description">Detecta se um evento de clique ocorreu fora de um elemento. Ele ouve cliques que ocorrem em algum lugar no documento.</p>

- 📦 [1.5 kB gzipped](/size-snapshot).
- ⚛️ Suporte para portais

## Exemplo

Por exemplo, se você precisar ocultar um menu quando as pessoas clicarem em qualquer outro lugar da sua página:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Observe que o componente aceita apenas um elemento filho. Você pode encontrar demonstrações avançadas na [seção documentação de menu](/components/menus/#menulist-composition).

## Portal

A demonstração a seguir usa [`Portal`](/components/portal/) para renderizar o menu suspenso em uma nova "subárvore" fora da hierarquia atual do DOM.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Eventos

Por padrão, o componente responde aos eventos de clique e de toque final (click + touch end). No entanto, você pode configurá-lo para responder aos eventos de mouse pressionado e toque inicial (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ Neste modo, apenas as interações na barra de rolagem do documento são ignoradas.