---
filename: /packages/material-ui/src/TablePagination/TablePagination.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TablePagination API

<p class="description">The API documentation of the TablePagination React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TablePagination from '@material-ui/core/TablePagination';
// or
import { TablePagination } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

A `TableCell` based component for placing inside `TableFooter` for pagination.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--ActionsComponent"></a><a href="#props--ActionsComponent" class="prop-name">ActionsComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">TablePaginationActions</span> | The component used for displaying the actions. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--backIconButtonProps"></a><a href="#props--backIconButtonProps" class="prop-name">backIconButtonProps</a> | <span class="prop-type">object</span> |  | Props applied to the back arrow [`IconButton`](/api/icon-button/) component. |
| <a class="anchor-link" id="props--backIconButtonText"></a><a href="#props--backIconButtonText" class="prop-name">backIconButtonText</a> | <span class="prop-type">string</span> | <span class="prop-default">'Previous page'</span> | Text label for the back arrow icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">TableCell</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--count"></a><a href="#props--count" class="prop-name required">count&nbsp;*</a> | <span class="prop-type">number</span> |  | The total number of rows. |
| <a class="anchor-link" id="props--labelDisplayedRows"></a><a href="#props--labelDisplayedRows" class="prop-name">labelDisplayedRows</a> | <span class="prop-type">func</span> | <span class="prop-default">({ from, to, count }) =>`${from}-${to === -1 ? count : to} of ${count}`</span> | Customize the displayed rows label.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--labelRowsPerPage"></a><a href="#props--labelRowsPerPage" class="prop-name">labelRowsPerPage</a> | <span class="prop-type">node</span> | <span class="prop-default">'Rows per page:'</span> | Customize the rows per page label. Invoked with a `{ from, to, count, page }` object.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--nextIconButtonProps"></a><a href="#props--nextIconButtonProps" class="prop-name">nextIconButtonProps</a> | <span class="prop-type">object</span> |  | Props applied to the next arrow [`IconButton`](/api/icon-button/) element. |
| <a class="anchor-link" id="props--nextIconButtonText"></a><a href="#props--nextIconButtonText" class="prop-name">nextIconButtonText</a> | <span class="prop-type">string</span> | <span class="prop-default">'Next page'</span> | Text label for the next arrow icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--onChangePage"></a><a href="#props--onChangePage" class="prop-name required">onChangePage&nbsp;*</a> | <span class="prop-type">func</span> |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback.<br>*page:* The page selected. |
| <a class="anchor-link" id="props--onChangeRowsPerPage"></a><a href="#props--onChangeRowsPerPage" class="prop-name">onChangeRowsPerPage</a> | <span class="prop-type">func</span> |  | Callback fired when the number of rows per page is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--page"></a><a href="#props--page" class="prop-name required">page&nbsp;*</a> | <span class="prop-type">number</span> |  | The zero-based index of the current page. |
| <a class="anchor-link" id="props--rowsPerPage"></a><a href="#props--rowsPerPage" class="prop-name required">rowsPerPage&nbsp;*</a> | <span class="prop-type">number</span> |  | The number of rows per page. |
| <a class="anchor-link" id="props--rowsPerPageOptions"></a><a href="#props--rowsPerPageOptions" class="prop-name">rowsPerPageOptions</a> | <span class="prop-type">array</span> | <span class="prop-default">[10, 25, 50, 100]</span> | Customizes the options of the rows per page select field. If less than two options are available, no select field will be displayed. |
| <a class="anchor-link" id="props--SelectProps"></a><a href="#props--SelectProps" class="prop-name">SelectProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the rows per page [`Select`](/api/select/) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([TableCell](/api/table-cell/)).

## CSS

- Style sheet name: `MuiTablePagination`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTablePagination-root</span> | Styles applied to the root element.
| <span class="prop-name">toolbar</span> | <span class="prop-name">.MuiTablePagination-toolbar</span> | Styles applied to the Toolbar component.
| <span class="prop-name">spacer</span> | <span class="prop-name">.MuiTablePagination-spacer</span> | Styles applied to the spacer element.
| <span class="prop-name">caption</span> | <span class="prop-name">.MuiTablePagination-caption</span> | Styles applied to the caption Typography components if `variant="caption"`.
| <span class="prop-name">selectRoot</span> | <span class="prop-name">.MuiTablePagination-selectRoot</span> | Styles applied to the Select component root element.
| <span class="prop-name">select</span> | <span class="prop-name">.MuiTablePagination-select</span> | Styles applied to the Select component `select` class.
| <span class="prop-name">selectIcon</span> | <span class="prop-name">.MuiTablePagination-selectIcon</span> | Styles applied to the Select component `icon` class.
| <span class="prop-name">input</span> | <span class="prop-name">.MuiTablePagination-input</span> | Styles applied to the `InputBase` component.
| <span class="prop-name">menuItem</span> | <span class="prop-name">.MuiTablePagination-menuItem</span> | Styles applied to the MenuItem component.
| <span class="prop-name">actions</span> | <span class="prop-name">.MuiTablePagination-actions</span> | Styles applied to the internal `TablePaginationActions` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TablePagination/TablePagination.js) for more detail.

## Inheritance

The props of the [TableCell](/api/table-cell/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Tables](/components/tables/)

