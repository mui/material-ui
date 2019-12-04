---
filename: /packages/material-ui/src/Divider/Divider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Divider API

<p class="description">The API documentation of the Divider React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Divider from '@material-ui/core/Divider';
// or
import { Divider } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--absolute"></a><a href="#props--absolute" title="link to the prop on this page" class="prop-name">absolute</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Absolutely position the element. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'hr'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--light"></a><a href="#props--light" title="link to the prop on this page" class="prop-name">light</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the divider will have a lighter color. |
| <a class="anchor-link" id="props--orientation"></a><a href="#props--orientation" title="link to the prop on this page" class="prop-name">orientation</a> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The divider orientation. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'fullWidth'<br>&#124;&nbsp;'inset'<br>&#124;&nbsp;'middle'</span> | <span class="prop-default">'fullWidth'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiDivider`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiDivider-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--absolute"></a><a href="#css--absolute" class="prop-name">absolute</a> | <span class="prop-name">.MuiDivider-absolute</span> | Styles applied to the root element if `absolute={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--inset"></a><a href="#css--inset" class="prop-name">inset</a> | <span class="prop-name">.MuiDivider-inset</span> | Styles applied to the root element if `variant="inset"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--light"></a><a href="#css--light" class="prop-name">light</a> | <span class="prop-name">.MuiDivider-light</span> | Styles applied to the root element if `light={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--middle"></a><a href="#css--middle" class="prop-name">middle</a> | <span class="prop-name">.MuiDivider-middle</span> | Styles applied to the root element if `variant="middle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiDivider-vertical</span> | Styles applied to the root element if `orientation="vertical"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Divider/Divider.js) for more detail.

## Demos

- [Dividers](/components/dividers/)
- [Lists](/components/lists/)

