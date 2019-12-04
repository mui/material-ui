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

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--align"></a><a href="#props--align" title="link to the prop on this page" class="prop-name">align</a> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'justify'</span> | <span class="prop-default">'inherit'</span> | Set the text-align on the table cell content.<br>Monetary or generally number fields **should be right aligned** as that allows you to add them up quickly in your head without having to worry about decimals. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The table cell contents. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--padding"></a><a href="#props--padding" title="link to the prop on this page" class="prop-name">padding</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'checkbox'<br>&#124;&nbsp;'none'</span> |  | Sets the padding applied to the cell. By default, the Table parent component set the value (`default`). |
| <a class="anchor-link" id="props--scope"></a><a href="#props--scope" title="link to the prop on this page" class="prop-name">scope</a> | <span class="prop-type">string</span> |  | Set scope attribute. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" title="link to the prop on this page" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> |  | Specify the size of the cell. By default, the Table parent component set the value (`medium`). |
| <a class="anchor-link" id="props--sortDirection"></a><a href="#props--sortDirection" title="link to the prop on this page" class="prop-name">sortDirection</a> | <span class="prop-type">'asc'<br>&#124;&nbsp;'desc'<br>&#124;&nbsp;false</span> |  | Set aria-sort direction. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'head'<br>&#124;&nbsp;'body'<br>&#124;&nbsp;'footer'</span> |  | Specify the cell type. By default, the TableHead, TableBody or TableFooter parent component set the value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTableCell`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTableCell-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--head"></a><a href="#css--head" class="prop-name">head</a> | <span class="prop-name">.MuiTableCell-head</span> | Styles applied to the root element if `variant="head"` or `context.table.head`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--body"></a><a href="#css--body" class="prop-name">body</a> | <span class="prop-name">.MuiTableCell-body</span> | Styles applied to the root element if `variant="body"` or `context.table.body`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--footer"></a><a href="#css--footer" class="prop-name">footer</a> | <span class="prop-name">.MuiTableCell-footer</span> | Styles applied to the root element if `variant="footer"` or `context.table.footer`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--sizeSmall"></a><a href="#css--sizeSmall" class="prop-name">sizeSmall</a> | <span class="prop-name">.MuiTableCell-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paddingCheckbox"></a><a href="#css--paddingCheckbox" class="prop-name">paddingCheckbox</a> | <span class="prop-name">.MuiTableCell-paddingCheckbox</span> | Styles applied to the root element if `padding="checkbox"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paddingNone"></a><a href="#css--paddingNone" class="prop-name">paddingNone</a> | <span class="prop-name">.MuiTableCell-paddingNone</span> | Styles applied to the root element if `padding="none"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignLeft"></a><a href="#css--alignLeft" class="prop-name">alignLeft</a> | <span class="prop-name">.MuiTableCell-alignLeft</span> | Styles applied to the root element if `align="left"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignCenter"></a><a href="#css--alignCenter" class="prop-name">alignCenter</a> | <span class="prop-name">.MuiTableCell-alignCenter</span> | Styles applied to the root element if `align="center"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignRight"></a><a href="#css--alignRight" class="prop-name">alignRight</a> | <span class="prop-name">.MuiTableCell-alignRight</span> | Styles applied to the root element if `align="right"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignJustify"></a><a href="#css--alignJustify" class="prop-name">alignJustify</a> | <span class="prop-name">.MuiTableCell-alignJustify</span> | Styles applied to the root element if `align="justify"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--stickyHeader"></a><a href="#css--stickyHeader" class="prop-name">stickyHeader</a> | <span class="prop-name">.MuiTableCell-stickyHeader</span> | Styles applied to the root element if `context.table.stickyHeader={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableCell/TableCell.js) for more detail.

## Demos

- [Tables](/components/tables/)

