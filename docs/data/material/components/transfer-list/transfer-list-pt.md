---
product: material-ui
title: Transfer list React component
components: List, ListItem, Checkbox, Switch
githubLabel: 'component: TransferList'
---

# Transfer list

<p class="description">Um transferência de lista (ou "shuttle") permite ao usuário mover um ou mais itens da lista entre as listas.</p>

Para completar, este exemplo inclui botões para "mover tudo", mas nem todas as transferências de lista precisam disso.

## Transferência de lista simples

Para completar, este exemplo inclui botões para "mover tudo", mas nem todas as transferências de lista precisam disso.

{{"demo": "TransferList.js", "bg": true}}

## Transferência de lista aprimorada

Este exemplo troca os botões "mover todos" por uma caixa de seleção para "selecionar todos / selecionar nenhum" e adiciona um contador.

{{"demo": "SelectAllTransferList.js", "bg": true}}

## Limitations

The component comes with a couple of limitations:

- It only works on desktop. If you have a limited amount of options to select, prefer the [Autocomplete](/material-ui/react-autocomplete/#multiple-values) component. If mobile support is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
- There are no high-level components exported from npm. The demos are based on composition. If this is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
