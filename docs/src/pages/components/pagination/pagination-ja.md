---
title: React Pagination component
components: Pagination, PaginationItem
---

# Pagination

<p class="description">The Pagination component enables the user to select a specific page from a range of pages.</p>

## Basic pagination

{{"demo": "pages/components/pagination/BasicPagination.js"}}

## Outlined pagination

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## Rounded pagination

{{"demo": "pages/components/pagination/PaginationRounded.js"}}

## Pagination size

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## Button

You can optionally enable first-page and last-page buttons, or disable the previous-page and next-page buttons.

{{"demo": "pages/components/pagination/PaginationButtons.js"}}

## Pagination ranges

You can specify how many digits to display either side of current page with the `siblingRange` prop, and adjacent to the start and end page number with the `boundaryRange` prop.

{{"demo": "pages/components/pagination/PaginationRanges.js"}}

## Controlled pagination

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## Router integration

{{"demo": "pages/components/pagination/PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, we expose a headless `usePagination()` hook. It accepts almost the same options as the Pagination component minus all the props related to the rendering of JSX. The Pagination component uses this hook internally.

```jsx
import { usePagination } from '@material-ui/lab/Pagination';
```

{{"demo": "pages/components/pagination/UsePagination.js"}}

## Table pagination

The `Pagination` component was designed to paginate a list of arbitrary items when infinite loading isn't used. It's preferred in contexts where SEO is important, for instance, a blog.

For the pagination of a large set of tabular data, you should use the `TablePagination` component.

{{"demo": "pages/components/pagination/TablePagination.js"}}

You can learn more about this use case in the [table section](/components/tables/#custom-pagination-options) of the documentation.

## アクセシビリティ

### ARIA

The root node has a role of "navigation" and aria-label "pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.). You can override these using the `getItemAriaLabel` prop.

### Keyboard

The pagination items are in tab order, with a tabindex of "0".
