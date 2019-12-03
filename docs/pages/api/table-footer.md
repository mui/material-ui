---
filename: /packages/material-ui/src/TableFooter/TableFooter.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableFooter API

<p class="description">The API documentation of the TableFooter React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TableFooter from '@material-ui/core/TableFooter';
// or
import { TableFooter } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component, normally `TableRow`. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'tfoot'</span> | The component used for the root node. Either a string to use a DOM element or a component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTableFooter`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTableFooter-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableFooter/TableFooter.js) for more detail.

## Demos

- [Tables](/components/tables/)

