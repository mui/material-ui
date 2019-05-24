---
filename: /packages/material-ui/src/TableCell/TableCell.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableCell API

<p class="description">The API documentation of the TableCell React component. Learn more about the properties and the CSS customization points.</p>

```js
import TableCell from '@material-ui/core/TableCell';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">enum:&nbsp;'inherit', 'left', 'center', 'right', 'justify'<br></span> | <span class="prop-default">'inherit'</span> | Set the text-align on the table cell content.<br>Monetary or generally number fields **should be right aligned** as that allows you to add them up quickly in your head without having to worry about decimals. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The table cell contents. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">padding</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'checkbox'&nbsp;&#124;<br>&nbsp;'none'<br></span> |  | Sets the padding applied to the cell. By default, the Table parent component set the value. |
| <span class="prop-name">scope</span> | <span class="prop-type">string</span> |  | Set scope attribute. |
| <span class="prop-name">size</span> | <span class="prop-type">enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'<br></span> |  | Specify the size of the cell. By default, the Table parent component set the value (`normal`). |
| <span class="prop-name">sortDirection</span> | <span class="prop-type">enum:&nbsp;'asc'&nbsp;&#124;<br>&nbsp;'desc'&nbsp;&#124;<br>&nbsp;false<br></span> |  | Set aria-sort direction. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'head'&nbsp;&#124;<br>&nbsp;'body'&nbsp;&#124;<br>&nbsp;'footer'<br></span> |  | Specify the cell type. By default, the TableHead, TableBody or TableFooter parent component set the value. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">head</span> | Styles applied to the root element if `variant="head"` or `context.table.head`.
| <span class="prop-name">body</span> | Styles applied to the root element if `variant="body"` or `context.table.body`.
| <span class="prop-name">footer</span> | Styles applied to the root element if `variant="footer"` or `context.table.footer`.
| <span class="prop-name">sizeSmall</span> | Styles applied to the root element if `padding="dense"`.
| <span class="prop-name">paddingCheckbox</span> | Styles applied to the root element if `padding="checkbox"`.
| <span class="prop-name">paddingNone</span> | Styles applied to the root element if `padding="none"`.
| <span class="prop-name">alignLeft</span> | Styles applied to the root element if `align="left"`.
| <span class="prop-name">alignCenter</span> | Styles applied to the root element if `align="center"`.
| <span class="prop-name">alignRight</span> | Styles applied to the root element if `align="right"`.
| <span class="prop-name">alignJustify</span> | Styles applied to the root element if `align="justify"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableCell/TableCell.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTableCell`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tables](/components/tables/)

