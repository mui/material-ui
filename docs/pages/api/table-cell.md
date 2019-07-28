---
filename: /packages/material-ui/src/TableCell/TableCell.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableCell API

<p class="description">The API documentation of the TableCell React component. Learn more about the props and the CSS customization points.</p>

```js
import { TableCell } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'justify'</span> | <span class="prop-default">'inherit'</span> | Set the text-align on the table cell content.<br>Monetary or generally number fields **should be right aligned** as that allows you to add them up quickly in your head without having to worry about decimals. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The table cell contents. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">padding</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'checkbox'<br>&#124;&nbsp;'none'</span> |  | Sets the padding applied to the cell. By default, the Table parent component set the value (`default`). |
| <span class="prop-name">scope</span> | <span class="prop-type">string</span> |  | Set scope attribute. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> |  | Specify the size of the cell. By default, the Table parent component set the value (`medium`). |
| <span class="prop-name">sortDirection</span> | <span class="prop-type">'asc'<br>&#124;&nbsp;'desc'<br>&#124;&nbsp;false</span> |  | Set aria-sort direction. |
| <span class="prop-name">variant</span> | <span class="prop-type">'head'<br>&#124;&nbsp;'body'<br>&#124;&nbsp;'footer'</span> |  | Specify the cell type. By default, the TableHead, TableBody or TableFooter parent component set the value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTableCell`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiTableCell-root</span> | Styles applied to the root element.
| <span class="prop-name">head</span> | <span class="prop-name">MuiTableCell-head</span> | Styles applied to the root element if `variant="head"` or `context.table.head`.
| <span class="prop-name">body</span> | <span class="prop-name">MuiTableCell-body</span> | Styles applied to the root element if `variant="body"` or `context.table.body`.
| <span class="prop-name">footer</span> | <span class="prop-name">MuiTableCell-footer</span> | Styles applied to the root element if `variant="footer"` or `context.table.footer`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">MuiTableCell-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">paddingCheckbox</span> | <span class="prop-name">MuiTableCell-paddingCheckbox</span> | Styles applied to the root element if `padding="checkbox"`.
| <span class="prop-name">paddingNone</span> | <span class="prop-name">MuiTableCell-paddingNone</span> | Styles applied to the root element if `padding="none"`.
| <span class="prop-name">alignLeft</span> | <span class="prop-name">MuiTableCell-alignLeft</span> | Styles applied to the root element if `align="left"`.
| <span class="prop-name">alignCenter</span> | <span class="prop-name">MuiTableCell-alignCenter</span> | Styles applied to the root element if `align="center"`.
| <span class="prop-name">alignRight</span> | <span class="prop-name">MuiTableCell-alignRight</span> | Styles applied to the root element if `align="right"`.
| <span class="prop-name">alignJustify</span> | <span class="prop-name">MuiTableCell-alignJustify</span> | Styles applied to the root element if `align="justify"`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableCell/TableCell.js) for more detail.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tables](/components/tables/)

