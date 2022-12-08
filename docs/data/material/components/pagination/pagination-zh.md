---
product: material-ui
title: React Pagination（分页）组件
components: Pagination, PaginationItem
githubLabel: 'component: pagination'
---

# Pagination 分页

<p class="description">使用分页组件，用户可以从一系列页面中选择某个特定的页面。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础分页

{{"demo": "BasicPagination.js"}}

## 描边分页

{{"demo": "PaginationOutlined.js"}}

## 圆形分页

{{"demo": "PaginationRounded.js"}}

## 分页大小

{{"demo": "PaginationSize.js"}}

## 按钮

你可以有选择地启用首尾页的按钮，或这禁用上一页和下一页的按钮。

{{"demo": "PaginationButtons.js"}}

## 分页范围

你可以使用 `siblingRange` 属性来指定当前页面两侧显示的数字多少，并使用`boundaryRange`属性来调整在起始和结束页码旁边显示的位数。

{{"demo": "CustomIcons.js"}}

## 分页范围

你可以使用 `siblingRange` 属性来指定当前页面两侧显示的数字多少，并使用`boundaryRange`属性来调整在起始和结束页码旁边显示的位数。

{{"demo": "PaginationRanges.js"}}

## 可控制的分页

{{"demo": "PaginationControlled.js"}}

## 与 Router 整合

{{"demo": "PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, a headless `usePagination()` hook is exposed. 它支持的选项与分页组件大致相同，但不包括与 JSX 渲染有关的所有属性。 它支持的选项与分页组件大致相同，但不包括与 JSX 渲染有关的所有属性。 The Pagination component is built on this hook.

```jsx
import usePagination from '@mui/material/usePagination';
```

{{"demo": "UsePagination.js"}}

## 表格分页

`Pagination` 组件的设计是为了在不使用无限加载的情况下，将任意数量的项目进行分页。 比如说博客这样重视 SEO 的环境下，它是首选。

对于大型表格数据的分页，应该使用 `TablePagination` 组件。

{{"demo": "TablePagination.js"}}

:::info
⚠️ Note that the `Pagination` page prop starts at 1 to match the requirement of including the value in the URL, while the `TablePagination` page prop starts at 0 to match the requirement of zero-based JavaScript arrays that comes with rendering a lot of tabular data.
:::

You can learn more about this use case in the [table section](/material-ui/react-table/#custom-pagination-options) of the documentation.

## Accessibility

### ARIA

The root node has a role of "navigation" and aria-label "pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.). You can override these using the `getItemAriaLabel` prop.

### 键盘输入

The pagination items are in tab order, with a tabindex of "0".
