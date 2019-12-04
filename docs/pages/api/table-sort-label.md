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

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--active"></a><a href="#props--active" title="link to the prop on this page" class="prop-name">active</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will have the active styling (should be true for the sorted column). |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Label contents, the arrow will be appended automatically. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--direction"></a><a href="#props--direction" title="link to the prop on this page" class="prop-name">direction</a> | <span class="prop-type">'asc'<br>&#124;&nbsp;'desc'</span> | <span class="prop-default">'desc'</span> | The current sort direction. |
| <a class="anchor-link" id="props--hideSortIcon"></a><a href="#props--hideSortIcon" title="link to the prop on this page" class="prop-name">hideSortIcon</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Hide sort icon when active is false. |
| <a class="anchor-link" id="props--IconComponent"></a><a href="#props--IconComponent" title="link to the prop on this page" class="prop-name">IconComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDownwardIcon</span> | Sort icon to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiTableSortLabel`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTableSortLabel-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--active"></a><a href="#css--active" class="prop-name">active</a> | <span class="prop-name">.MuiTableSortLabel-active</span> | Pseudo-class applied to the root element if `active={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--icon"></a><a href="#css--icon" class="prop-name">icon</a> | <span class="prop-name">.MuiTableSortLabel-icon</span> | Styles applied to the icon component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--iconDirectionDesc"></a><a href="#css--iconDirectionDesc" class="prop-name">iconDirectionDesc</a> | <span class="prop-name">.MuiTableSortLabel-iconDirectionDesc</span> | Styles applied to the icon component if `direction="desc"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--iconDirectionAsc"></a><a href="#css--iconDirectionAsc" class="prop-name">iconDirectionAsc</a> | <span class="prop-name">.MuiTableSortLabel-iconDirectionAsc</span> | Styles applied to the icon component if `direction="asc"`.

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

