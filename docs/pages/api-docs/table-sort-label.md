---
filename: /packages/material-ui/src/TableSortLabel/TableSortLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableSortLabel API

<p class="description">The API documentation of the TableSortLabel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TableSortLabel from '@material-ui/core/TableSortLabel';
// or
import { TableSortLabel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

A button based label for placing inside `TableCell` for column sorting.

## Component name

The `MuiTableSortLabel` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">active</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will have the active styling (should be true for the sorted column). |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Label contents, the arrow will be appended automatically. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">direction</span> | <span class="prop-type">'asc'<br>&#124;&nbsp;'desc'</span> | <span class="prop-default">'asc'</span> | The current sort direction. |
| <span class="prop-name">hideSortIcon</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Hide sort icon when active is false. |
| <span class="prop-name">IconComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDownwardIcon</span> | Sort icon to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTableSortLabel-root</span> | Styles applied to the root element.
| <span class="prop-name">active</span> | <span class="prop-name">.MuiTableSortLabel-active</span> | Pseudo-class applied to the root element if `active={true}`.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiTableSortLabel-icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconDirectionDesc</span> | <span class="prop-name">.MuiTableSortLabel-iconDirectionDesc</span> | Styles applied to the icon component if `direction="desc"`.
| <span class="prop-name">iconDirectionAsc</span> | <span class="prop-name">.MuiTableSortLabel-iconDirectionAsc</span> | Styles applied to the icon component if `direction="asc"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableSortLabel/TableSortLabel.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Tables](/components/tables/)

