---
filename: /packages/material-ui/src/Toolbar/Toolbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Toolbar API

<p class="description">The API documentation of the Toolbar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Toolbar from '@material-ui/core/Toolbar';
// or
import { Toolbar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disableGutters"></a><a href="#props--disableGutters" title="link to the prop on this page" class="prop-name">disableGutters</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, disables gutter padding. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'regular'<br>&#124;&nbsp;'dense'</span> | <span class="prop-default">'regular'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiToolbar`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiToolbar-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--gutters"></a><a href="#css--gutters" class="prop-name">gutters</a> | <span class="prop-name">.MuiToolbar-gutters</span> | Styles applied to the root element if `disableGutters={false}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--regular"></a><a href="#css--regular" class="prop-name">regular</a> | <span class="prop-name">.MuiToolbar-regular</span> | Styles applied to the root element if `variant="regular"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dense"></a><a href="#css--dense" class="prop-name">dense</a> | <span class="prop-name">.MuiToolbar-dense</span> | Styles applied to the root element if `variant="dense"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Toolbar/Toolbar.js) for more detail.

## Demos

- [App Bar](/components/app-bar/)

