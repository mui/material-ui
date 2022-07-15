---
product: material-ui
title: Componente React para Detectar clique fora
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
---

# Observador de Clique (ClickAwayListener)

<p class="description">Detecta se um evento de clique ocorreu fora de um elemento. Ele ouve cliques que ocorrem em algum lugar no documento.</p>

- 📦 [1.5 kB gzipped](/size-snapshot/).
- ⚛️ Suporte para portais

[A paleta](/system/palette/) com funções de estilo.

## Exemplo

Por exemplo, se você precisar ocultar um menu quando as pessoas clicarem em qualquer outro lugar da sua página:

{{"demo": "ClickAway.js"}}

Observe que o componente aceita apenas um elemento filho. Você pode encontrar demonstrações avançadas na [seção documentação de menu](/material-ui/react-menu/#menulist-composition).

## Portal

A demonstração a seguir usa [`Portal`](/material-ui/react-portal/) para renderizar o menu suspenso em uma nova "subárvore" fora da hierarquia atual do DOM.

{{"demo": "PortalClickAway.js"}}

## Eventos

Por padrão, o componente responde aos eventos de clique e de toque final (click + touch end). No entanto, você pode configurá-lo para responder aos eventos de mouse pressionado e toque inicial (mouse down + touch start).

{{"demo": "LeadingClickAway.js"}}

> ⚠️ Neste modo, apenas as interações na barra de rolagem do documento são ignoradas.

## Accessibility

By default `<ClickAwayListener />` will add an `onClick` handler to its children. This can result in e.g. screen readers announcing the children as clickable. However, the purpose of the `onClick` handler is not to make `children` interactive.

In order to prevent screen readers from marking non-interactive children as "clickable" add `role="presentation"` to the immediate children:

```tsx
<ClickAwayListener>
  <div role="presentation">
    <h1>non-interactive heading</h1>
  </div>
</ClickAwayListern>
```

This is also required to fix a quirk in NVDA when using FireFox that prevents announcement of alert messages (see [mui-org/material-ui#29080](https://github.com/mui-org/material-ui/issues/29080)).

## Unstyled

- 📦 [784 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import ClickAwayListener from '@mui/base/ClickAwayListener';
```
