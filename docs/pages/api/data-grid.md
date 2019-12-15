---
filename: /packages/material-ui-lab/src/DataGrid/DataGrid.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# DataGrid API

<p class="description">The API documentation of the DataGrid React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import DataGrid from '@material-ui/lab/DataGrid';
// or
import { DataGrid } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">columns</span> | <span class="prop-type">Array&lt;{ children?: Array&lt;object&gt;, field: string, label?: string, resizable?: bool, sortable?: bool, sortingComparator?: func, sortingOrder?: Array&lt;'asc'<br>&#124;&nbsp;'desc'<br>&#124;&nbsp;null&gt; }&gt;</span> | <span class="prop-default">[]</span> | The columns configuration. |
| <span class="prop-name">dataProvider</span> | <span class="prop-type">{ getList: func }</span> |  | Manage the communication with the data store. |
| <span class="prop-name">defaultColumnOptions</span> | <span class="prop-type">{ resizable?: bool, sortable?: bool, sortingComparator?: func, sortingOrder?: Array&lt;'asc'<br>&#124;&nbsp;'desc'<br>&#124;&nbsp;null&gt; }</span> | <span class="prop-default">{  resizable: false,  sortable: false,  sortingOrder: ['asc', 'desc', null],}</span> | The default options that get applied to each column. |
| <span class="prop-name">defaultSorting</span> | <span class="prop-type">Array&lt;{ field: string, sort: 'asc'<br>&#124;&nbsp;'desc' }&gt;</span> | <span class="prop-default">[]</span> | The default sorting state. (Uncontrolled) |
| <span class="prop-name">loading</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the loading state is displayed. |
| <span class="prop-name">onSortingChange</span> | <span class="prop-type">func</span> |  | Callback fired when the user change the column sort.<br><br>**Signature:**<br>`function(event: object, value: string) => void`<br>*event:* The event source of the callback.<br>*value:* The new sorting value. |
| <span class="prop-name">rowsData</span> | <span class="prop-type">array</span> | <span class="prop-default">[]</span> | The data record array to be rendered. |
| <span class="prop-name">sorting</span> | <span class="prop-type">Array&lt;{ field: string, sort: 'asc'<br>&#124;&nbsp;'desc' }&gt;</span> |  | Sorting state. (Controlled) |
| <span class="prop-name">text</span> | <span class="prop-type">any</span> | <span class="prop-default">{  loading: 'Loading',}</span> | The localization strings. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiDataGrid`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiDataGrid-root</span> | Styles applied to the root element.
| <span class="prop-name">bodyContainer</span> | <span class="prop-name">.MuiDataGrid-bodyContainer</span> | 
| <span class="prop-name">headerLabel</span> | <span class="prop-name">.MuiDataGrid-headerLabel</span> | 
| <span class="prop-name">resize</span> | <span class="prop-name">.MuiDataGrid-resize</span> | 

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/DataGrid/DataGrid.js) for more detail.

## Demos

- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)
- [Data Grid](/components/data-grid/)

