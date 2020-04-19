---
filename: /packages/material-ui/src/TableCell/TableCell.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableCell API

<p class="description">The API documentation of the TableCell React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TableCell from '@material-ui/core/TableCell';
// or
import { TableCell } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

The component renders a `<th>` element when the parent context is a header
or otherwise a `<td>` element.

## Component name

The `MuiTableCell` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">'center'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'justify'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'</span> | <span class="prop-default">'inherit'</span> | Set the text-align on the table cell content.<br>Monetary or generally number fields **should be right aligned** as that allows you to add them up quickly in your head without having to worry about decimals. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The table cell contents. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">padding</span> | <span class="prop-type">'checkbox'<br>&#124;&nbsp;'default'<br>&#124;&nbsp;'none'</span> |  | Sets the padding applied to the cell. By default, the Table parent component set the value (`default`). |
| <span class="prop-name">scope</span> | <span class="prop-type">string</span> |  | Set scope attribute. |
| <span class="prop-name">size</span> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> |  | Specify the size of the cell. By default, the Table parent component set the value (`medium`). |
| <span class="prop-name">sortDirection</span> | <span class="prop-type">'asc'<br>&#124;&nbsp;'desc'<br>&#124;&nbsp;false</span> |  | Set aria-sort direction. |
| <span class="prop-name">variant</span> | <span class="prop-type">'body'<br>&#124;&nbsp;'footer'<br>&#124;&nbsp;'head'</span> |  | Specify the cell type. By default, the TableHead, TableBody or TableFooter parent component set the value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTableCell-root</span> | Styles applied to the root element.
| <span class="prop-name">head</span> | <span class="prop-name">.MuiTableCell-head</span> | Styles applied to the root element if `variant="head"` or `context.table.head`.
| <span class="prop-name">body</span> | <span class="prop-name">.MuiTableCell-body</span> | Styles applied to the root element if `variant="body"` or `context.table.body`.
| <span class="prop-name">footer</span> | <span class="prop-name">.MuiTableCell-footer</span> | Styles applied to the root element if `variant="footer"` or `context.table.footer`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiTableCell-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">paddingCheckbox</span> | <span class="prop-name">.MuiTableCell-paddingCheckbox</span> | Styles applied to the root element if `padding="checkbox"`.
| <span class="prop-name">paddingNone</span> | <span class="prop-name">.MuiTableCell-paddingNone</span> | Styles applied to the root element if `padding="none"`.
| <span class="prop-name">alignLeft</span> | <span class="prop-name">.MuiTableCell-alignLeft</span> | Styles applied to the root element if `align="left"`.
| <span class="prop-name">alignCenter</span> | <span class="prop-name">.MuiTableCell-alignCenter</span> | Styles applied to the root element if `align="center"`.
| <span class="prop-name">alignRight</span> | <span class="prop-name">.MuiTableCell-alignRight</span> | Styles applied to the root element if `align="right"`.
| <span class="prop-name">alignJustify</span> | <span class="prop-name">.MuiTableCell-alignJustify</span> | Styles applied to the root element if `align="justify"`.
| <span class="prop-name">stickyHeader</span> | <span class="prop-name">.MuiTableCell-stickyHeader</span> | Styles applied to the root element if `context.table.stickyHeader={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableCell/TableCell.js) for more detail.

## Demos

- [Tables](/components/tables/)

