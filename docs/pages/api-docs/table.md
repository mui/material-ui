---
filename: /packages/material-ui/src/Table/Table.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Table API

<p class="description">The API documentation of the Table React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Table from '@material-ui/core/Table';
// or
import { Table } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiTable` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">node</span> |  | The content of the table, normally `TableHead` and `TableBody`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'table'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">padding</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'checkbox'<br>&#124;&nbsp;'none'</span> | <span class="prop-default">'default'</span> | Allows TableCells to inherit padding of the Table. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> | <span class="prop-default">'medium'</span> | Allows TableCells to inherit size of the Table. |
| <span class="prop-name">stickyHeader</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Set the header sticky.<br>⚠️ It doesn't work with IE 11. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTable-root</span> | Styles applied to the root element.
| <span class="prop-name">stickyHeader</span> | <span class="prop-name">.MuiTable-stickyHeader</span> | Styles applied to the root element if `stickyHeader={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Table/Table.js) for more detail.

## Demos

- [Tables](/components/tables/)

