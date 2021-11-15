---
title: Componente React para Transferência de Lista
components: List, ListItem, Checkbox, Switch
githubLabel: 'component: TransferList'
---

# Transferência de Lista

<p class="description">Um transferência de lista (ou "shuttle") permite ao usuário mover um ou mais itens da lista entre as listas.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic transfer list

For completeness, this example includes buttons for "move all", but not every transfer list needs these.

{{"demo": "pages/components/transfer-list/TransferList.js", "bg": true}}

## Enhanced transfer list

This example exchanges the "move all" buttons for a "select all / select none" checkbox, and adds a counter.

{{"demo": "pages/components/transfer-list/SelectAllTransferList.js", "bg": true}}

## Limitações

The component comes with a couple of limitations:

- It only works on desktop. If you have a limited amount of options to select, prefer the [Autocomplete](/components/autocomplete/#multiple-values) component. If mobile support is important for you, have a look at [#27579](https://github.com/mui-org/material-ui/issues/27579).
- There are no high-level components exported from npm. The demos are based on composition. If this is important for you, have a look at [#27579](https://github.com/mui-org/material-ui/issues/27579).
