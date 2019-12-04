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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the table, normally `TableHead` and `TableBody`. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'table'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--padding"></a><a href="#props--padding" title="link to the prop on this page" class="prop-name">padding</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'checkbox'<br>&#124;&nbsp;'none'</span> | <span class="prop-default">'default'</span> | Allows TableCells to inherit padding of the Table. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" title="link to the prop on this page" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> | <span class="prop-default">'medium'</span> | Allows TableCells to inherit size of the Table. |
| <a class="anchor-link" id="props--stickyHeader"></a><a href="#props--stickyHeader" title="link to the prop on this page" class="prop-name">stickyHeader</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Set the header sticky.<br>⚠️ It doesn't work with IE 11. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTable`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTable-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--stickyHeader"></a><a href="#css--stickyHeader" class="prop-name">stickyHeader</a> | <span class="prop-name">.MuiTable-stickyHeader</span> | Styles applied to the root element if `stickyHeader={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Table/Table.js) for more detail.

## Demos

- [Tables](/components/tables/)

