---
title: React Pagination（分页）组件
components: Pagination, PaginationItem
githubLabel: 'component: Pagination'
---

# Pagination 分页

<p class="description">使用分页组件，用户可以从一系列页面中选择某个特定的页面。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础分页

{{"demo": "pages/components/pagination/BasicPagination.js"}}

## 描边分页

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## 圆形分页

{{"demo": "pages/components/pagination/PaginationRounded.js"}}

## 分页大小

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## 按钮

你可以有选择地启用首尾页的按钮，或这禁用上一页和下一页的按钮。

{{"demo": "pages/components/pagination/PaginationButtons.js"}}

## Custom icons

It's possible to customize the control icons.

{{"demo": "pages/components/pagination/CustomIcons.js"}}

## Pagination ranges

You can specify how many digits to display either side of current page with the `siblingRange` prop, and adjacent to the start and end page number with the `boundaryRange` prop.

{{"demo": "pages/components/pagination/PaginationRanges.js"}}

## Controlled pagination

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## Router integration

{{"demo": "pages/components/pagination/PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, a headless `usePagination()` hook is exposed. It accepts almost the same options as the Pagination component minus all the props related to the rendering of JSX. The Pagination component is built on this hook.

```jsx
import { usePagination } from '@mui/material/Pagination';
```

{{"demo": "pages/components/pagination/UsePagination.js"}}

## Table pagination

The `Pagination` component was designed to paginate a list of arbitrary items when infinite loading isn't used. It's preferred in contexts where SEO is important, for instance, a blog.

For the pagination of a large set of tabular data, you should use the `TablePagination` component.

{{"demo": "pages/components/pagination/TablePagination.js"}}

> ⚠️ Note that the `Pagination` page prop starts at 1 to match the requirement of including the value in the URL, while the `TablePagination` page prop starts at 0 to match the requirement of zero-based JavaScript arrays that comes with rendering a lot of tabular data.

You can learn more about this use case in the [table section](/components/tables/#custom-pagination-options) of the documentation.

## 无障碍设计

### ARIA

The root node has a role of "navigation" and aria-label "pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.). You can override these using the `getItemAriaLabel` prop.

### 键盘输入

The pagination items are in tab order, with a tabindex of "0".
