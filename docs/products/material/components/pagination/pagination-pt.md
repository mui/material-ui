---
product: material
title: Componente React Paginação
components: Pagination, PaginationItem
githubLabel: 'component: Pagination'
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

Você pode habilitar opcionalmente  os botões de primeira página e de última página, ou desabilitar botões de página anterior e de próxima página.

{{"demo": "PaginationButtons.js"}}

## Custom icons

It's possible to customize the control icons.

{{"demo": "CustomIcons.js"}}

## Intervalos de paginação

Você pode especificar quantos dígitos exibir a qualquer lado da página atual com a propriedade `siblingRange`, e adjacente ao número da página inicial e final com a propriedade `boundaryRange`.

{{"demo": "PaginationRanges.js"}}

## Paginação controlada

{{"demo": "PaginationControlled.js"}}

## Integração com router

{{"demo": "PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, a headless `usePagination()` hook is exposed. Ele aceita quase as mesmas opções que o componente de paginação, menos todas as propriedades relacionadas à renderização de JSX. The Pagination component is built on this hook.

```jsx
import { usePagination } from '@mui/material/Pagination';
```

{{"demo": "UsePagination.js"}}

## Paginação em tabelas

O componente `Pagination` foi projetado para paginar uma lista de itens arbitrários quando a carga infinita não é usada. É preferível em contextos onde o SEO é importante, por exemplo, um blog.

Para a paginação de um conjunto grande de dados tabulares, você deve usar o componente `TablePagination`.

{{"demo": "TablePagination.js"}}

> ⚠️ Note that the `Pagination` page prop starts at 1 to match the requirement of including the value in the URL, while the `TablePagination` page prop starts at 0 to match the requirement of zero-based JavaScript arrays that comes with rendering a lot of tabular data.

Você pode aprender mais sobre este caso de uso na [seção de tabela](/material/components/tables/#custom-pagination-options) da documentação.

## Accessibility

### ARIA

O nó raiz tem uma role de "navigation" e o rótulo aria-label "pagination navigation" por padrão. Os itens da página têm um rótulo aria-label que identifica a finalidade do item ("go to first page", "go to previous page", "go to page 1" etc.). Você pode substituir estes padrões usando a propriedade `getItemAriaLabel`.

### Teclado

Os itens de paginação estão em ordem de tabulação, com um índice de tabulação iniciando em "0".
