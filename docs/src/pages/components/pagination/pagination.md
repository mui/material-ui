---
title: Pagination React component
components: Pagination
---

# Pagination

<p class="description">The Pagination component enables the user to select a specific page from a range of pages.</p>

## Pagination

{{"demo": "pages/components/pagination/Pagination.js"}}

## Outlined pagination

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## Outlined rounded pagination

{{"demo": "pages/components/pagination/PaginationOutlinedRounded.js"}}

## Pagination size

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## Controlled pagination

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## Accessibility

### ARIA

The root node has a role of "navigation" and aria-label "Pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.). You can override these using the `getItemAriaLabel` prop.

### Keyboard

The pagination items are in tab order, with a tabindex of "0".
