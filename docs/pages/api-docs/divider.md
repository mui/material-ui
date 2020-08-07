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



## Component name

The `MuiDivider` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">absolute</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Absolutely position the element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'hr'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">flexItem</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a vertical divider will have the correct height when used in flex container. (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.) |
| <span class="prop-name">light</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the divider will have a lighter color. |
| <span class="prop-name">orientation</span> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The divider orientation. |
| <span class="prop-name">variant</span> | <span class="prop-type">'fullWidth'<br>&#124;&nbsp;'inset'<br>&#124;&nbsp;'middle'</span> | <span class="prop-default">'fullWidth'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiDivider-root</span> | Styles applied to the root element.
| <span class="prop-name">absolute</span> | <span class="prop-name">.MuiDivider-absolute</span> | Styles applied to the root element if `absolute={true}`.
| <span class="prop-name">inset</span> | <span class="prop-name">.MuiDivider-inset</span> | Styles applied to the root element if `variant="inset"`.
| <span class="prop-name">light</span> | <span class="prop-name">.MuiDivider-light</span> | Styles applied to the root element if `light={true}`.
| <span class="prop-name">middle</span> | <span class="prop-name">.MuiDivider-middle</span> | Styles applied to the root element if `variant="middle"`.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiDivider-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">flexItem</span> | <span class="prop-name">.MuiDivider-flexItem</span> | Styles applied to the root element if `flexItem={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Divider/Divider.js) for more detail.

## Demos

- [Dividers](/components/dividers/)
- [Lists](/components/lists/)

