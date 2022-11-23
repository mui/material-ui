---
product: material-ui
title: Componente React Paginação
components: Pagination, PaginationItem
githubLabel: 'component: pagination'
---

# Paginação

<p class="description">O componente de paginação permite ao usuário selecionar uma página específica a partir de um intervalo de páginas.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Paginação básica

{{"demo": "BasicPagination.js"}}

## Paginação delineada

{{"demo": "PaginationOutlined.js"}}

## Paginação arredondada

{{"demo": "PaginationRounded.js"}}

## Tamanho da paginação

{{"demo": "PaginationSize.js"}}

## Botões

Você pode habilitar opcionalmente os botões de primeira página e de última página, ou desabilitar botões de página anterior e de próxima página.

{{"demo": "PaginationButtons.js"}}

## Intervalos de paginação

Você pode especificar quantos dígitos exibir a qualquer lado da página atual com a propriedade `siblingRange`, e adjacente ao número da página inicial e final com a propriedade `boundaryRange`.

{{"demo": "CustomIcons.js"}}

## Intervalos de paginação

Você pode especificar quantos dígitos exibir a qualquer lado da página atual com a propriedade `siblingRange`, e adjacente ao número da página inicial e final com a propriedade `boundaryRange`.

{{"demo": "PaginationRanges.js"}}

## Paginação controlada

{{"demo": "PaginationControlled.js"}}

## Integração com router

{{"demo": "PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, a headless `usePagination()` hook is exposed. It accepts almost the same options as the Pagination component minus all the props related to the rendering of JSX. The Pagination component is built on this hook.

```jsx
import usePagination from '@mui/material/usePagination';
```

{{"demo": "UsePagination.js"}}

## Paginação em tabelas

O componente `Pagination` foi projetado para paginar uma lista de itens arbitrários quando a carga infinita não é usada. É preferível em contextos onde o SEO é importante, por exemplo, um blog.

Para a paginação de um conjunto grande de dados tabulares, você deve usar o componente `TablePagination`.

{{"demo": "TablePagination.js"}}

:::info
⚠️ Note that the `Pagination` page prop starts at 1 to match the requirement of including the value in the URL, while the `TablePagination` page prop starts at 0 to match the requirement of zero-based JavaScript arrays that comes with rendering a lot of tabular data.
:::

You can learn more about this use case in the [table section](/material-ui/react-table/#custom-pagination-options) of the documentation.

## Accessibility

### ARIA

The root node has a role of "navigation" and aria-label "pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.). You can override these using the `getItemAriaLabel` prop.

### Teclado

The pagination items are in tab order, with a tabindex of "0".
