---
title: Pagination React component
components: Pagination, PaginationItem
---

# Pagination

<p class="description">El componente de paginación permite al usuario seleccionar una página específica de un rango de páginas.</p>

## Paginación básica

{{"demo": "pages/components/pagination/BasicPagination.js"}}

## Paginación delineada

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## Paginación redondeada

{{"demo": "pages/components/pagination/PaginationRounded.js"}}

## Tamaño de paginación

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## Botones

Opcionalmente puede activar los botones de primera página y última página, o desactivar los botones de página anterior y página siguiente.

{{"demo": "pages/components/pagination/PaginationButtons.js"}}

## Rangos de paginación

You can specify how many digits to display either side of current page with the `siblingRange` prop, and adjacent to the start and end page number with the `boundaryRange` prop.

{{"demo": "pages/components/pagination/PaginationRanges.js"}}

## Controlled pagination

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## Router integration

{{"demo": "pages/components/pagination/PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, we expose a `usePagination()` hook. It accepts almost the same options as the Pagination component minus all the props related to the rendering of JSX. The Pagination component uses this hook internally.

```jsx
import { usePagination } from '@material-ui/lab/Pagination';
```

{{"demo": "pages/components/pagination/UsePagination.js"}}

## Table pagination

The `Pagination` component was designed to paginate a list of arbitrary items when infinite loading isn't used. It's preferred in contexts where SEO is important, for instance, a blog.

For the pagination of a large set of tabular data, you should use the `TablePagination` component.

{{"demo": "pages/components/pagination/TablePagination.js"}}

You can learn more about this use case in the [table section](/components/tables/#custom-pagination-options) of the documentation.

## Accesibilidad

### ARIA

The root node has a role of "navigation" and aria-label "pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.). You can override these using the `getItemAriaLabel` prop.

### Keyboard

The pagination items are in tab order, with a tabindex of "0".
