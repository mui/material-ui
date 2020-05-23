---
title: 分页React组件
components: Pagination, PaginationItem
---

# 分页

<p class="description">使用分页组件，用户能够从一系列页面中选择某个特定页面。</p>

## 基础分页

{{"demo": "pages/components/pagination/BasicPagination.js"}}

## 描边分页

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## 圆角分页

{{"demo": "pages/components/pagination/PaginationRounded.js"}}

## 分页大小

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## 按钮

你可以选择启用首页和尾页按钮，或禁用上一页和下一页按钮。

{{"demo": "pages/components/pagination/PaginationButtons.js"}}

## 分页范围

你可以使用`siblingRange`属性指定当前页面两侧显示的位数，并使用`boundaryRange`属性指定在起始页和结束页码旁边显示的位数。

{{"demo": "pages/components/pagination/PaginationRanges.js"}}

## 受控分页

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## 路由器集成

{{"demo": "pages/components/pagination/PaginationLink.js"}}

## `usePagination`

针对高级定制应用场景，我们公开了一个`usePagination()` hook。 它支持的选项与分页组件大致相同，但不包括与JSX渲染有关的所有属性 。 分页组件内部也使用的是这个hook。

```jsx
import { usePagination } from '@material-ui/lab/Pagination';
```

{{"demo": "pages/components/pagination/UsePagination.js"}}

## Table pagination

The `Pagination` component was designed to paginate a list of arbitrary items when infinite loading isn't used. It's preferred in contexts where SEO is important, for instance, a blog.

For the pagination of a large set of tabular data, you should use the `TablePagination` component.

{{"demo": "pages/components/pagination/TablePagination.js"}}

You can learn more about this use case in the [table section](/components/tables/#custom-pagination-options) of the documentation.

## 可访问性

### ARIA

默认情况下，根节点具有“导航”和aria-label“分页导航”的作用。 页面项目具有一个aria-label，用于标识项目的用途（“转到第一页”，“转到上一页”，“转到页面1”等）。 你可以使用 `getItemAriaLabel`属性来覆盖它们。

### 键盘

分页项目按标签顺序排列，标签索引为“0”。
