---
filename: /packages/material-ui/src/TablePagination/TablePagination.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TablePagination

A `TableCell` based component for placing inside `TableFooter` for pagination.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">ActionsComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">TablePaginationActions</span> | The component used for displaying the actions. Either a string to use a DOM element or a component. |
| <span class="prop-name">backIconButtonProps</span> | <span class="prop-type">object |  | Properties applied to the back arrow `IconButton` component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">TableCell</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name required">count *</span> | <span class="prop-type">number |  | The total number of rows. |
| <span class="prop-name">labelDisplayedRows</span> | <span class="prop-type">func | <span class="prop-default">({ from, to, count }) => `${from}-${to} of ${count}`</span> | Customize the displayed rows label. |
| <span class="prop-name">labelRowsPerPage</span> | <span class="prop-type">node | <span class="prop-default">'Rows per page:'</span> | Customize the rows per page label. Invoked with a `{ from, to, count, page }` object. |
| <span class="prop-name">nextIconButtonProps</span> | <span class="prop-type">object |  | Properties applied to the next arrow `IconButton` element. |
| <span class="prop-name required">onChangePage *</span> | <span class="prop-type">func |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback<br>*page:* The page selected |
| <span class="prop-name">onChangeRowsPerPage</span> | <span class="prop-type">func |  | Callback fired when the number of rows per page is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name required">page *</span> | <span class="prop-type">number |  | The zero-based index of the current page. |
| <span class="prop-name required">rowsPerPage *</span> | <span class="prop-type">number |  | The number of rows per page. |
| <span class="prop-name">rowsPerPageOptions</span> | <span class="prop-type">array | <span class="prop-default">[5, 10, 25]</span> | Customizes the options of the rows per page select field. If less than two options are available, no select field will be displayed. |
| <span class="prop-name">SelectProps</span> | <span class="prop-type">object |  | Properties applied to the rows per page `Select` element. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `toolbar`
- `spacer`
- `menuItem`
- `caption`
- `input`
- `selectRoot`
- `select`
- `selectIcon`
- `actions`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/TablePagination/TablePagination.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTablePagination`.

## Inheritance

The properties of the [TableCell](/api/table-cell) component are also available.

## Demos

- [Tables](/demos/tables)

