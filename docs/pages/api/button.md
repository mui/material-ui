---
filename: /packages/material-ui/src/Button/Button.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Button API

<p class="description">The API documentation of the Button React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Button from '@material-ui/core/Button';
// or
import { Button } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the button. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <a class="anchor-link" id="props--disableFocusRipple"></a><a href="#props--disableFocusRipple" class="prop-name">disableFocusRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled.<br>⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `focusVisibleClassName`. |
| <a class="anchor-link" id="props--endIcon"></a><a href="#props--endIcon" class="prop-name">endIcon</a> | <span class="prop-type">node</span> |  | Element placed after the children. |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will take up the full width of its container. |
| <a class="anchor-link" id="props--href"></a><a href="#props--href" class="prop-name">href</a> | <span class="prop-type">string</span> |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <a class="anchor-link" id="props--startIcon"></a><a href="#props--startIcon" class="prop-name">startIcon</a> | <span class="prop-type">node</span> |  | Element placed before the children. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'contained'</span> | <span class="prop-default">'text'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiButton`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiButton-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiButton-label</span> | Styles applied to the span element that wraps the children.
| <a class="anchor-link" id="css--text"></a><a href="#css--text" class="prop-name">text</a> | <span class="prop-name">.MuiButton-text</span> | Styles applied to the root element if `variant="text"`.
| <a class="anchor-link" id="css--textPrimary"></a><a href="#css--textPrimary" class="prop-name">textPrimary</a> | <span class="prop-name">.MuiButton-textPrimary</span> | Styles applied to the root element if `variant="text"` and `color="primary"`.
| <a class="anchor-link" id="css--textSecondary"></a><a href="#css--textSecondary" class="prop-name">textSecondary</a> | <span class="prop-name">.MuiButton-textSecondary</span> | Styles applied to the root element if `variant="text"` and `color="secondary"`.
| <a class="anchor-link" id="css--outlined"></a><a href="#css--outlined" class="prop-name">outlined</a> | <span class="prop-name">.MuiButton-outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <a class="anchor-link" id="css--outlinedPrimary"></a><a href="#css--outlinedPrimary" class="prop-name">outlinedPrimary</a> | <span class="prop-name">.MuiButton-outlinedPrimary</span> | Styles applied to the root element if `variant="outlined"` and `color="primary"`.
| <a class="anchor-link" id="css--outlinedSecondary"></a><a href="#css--outlinedSecondary" class="prop-name">outlinedSecondary</a> | <span class="prop-name">.MuiButton-outlinedSecondary</span> | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
| <a class="anchor-link" id="css--contained"></a><a href="#css--contained" class="prop-name">contained</a> | <span class="prop-name">.MuiButton-contained</span> | Styles applied to the root element if `variant="contained"`.
| <a class="anchor-link" id="css--containedPrimary"></a><a href="#css--containedPrimary" class="prop-name">containedPrimary</a> | <span class="prop-name">.MuiButton-containedPrimary</span> | Styles applied to the root element if `variant="contained"` and `color="primary"`.
| <a class="anchor-link" id="css--containedSecondary"></a><a href="#css--containedSecondary" class="prop-name">containedSecondary</a> | <span class="prop-name">.MuiButton-containedSecondary</span> | Styles applied to the root element if `variant="contained"` and `color="secondary"`.
| <a class="anchor-link" id="css--focusVisible"></a><a href="#css--focusVisible" class="prop-name">focusVisible</a> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the ButtonBase root element if the button is keyboard focused.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--colorInherit"></a><a href="#css--colorInherit" class="prop-name">colorInherit</a> | <span class="prop-name">.MuiButton-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <a class="anchor-link" id="css--textSizeSmall"></a><a href="#css--textSizeSmall" class="prop-name">textSizeSmall</a> | <span class="prop-name">.MuiButton-textSizeSmall</span> | Styles applied to the root element if `size="small"` and `variant="text"`.
| <a class="anchor-link" id="css--textSizeLarge"></a><a href="#css--textSizeLarge" class="prop-name">textSizeLarge</a> | <span class="prop-name">.MuiButton-textSizeLarge</span> | Styles applied to the root element if `size="large"` and `variant="text"`.
| <a class="anchor-link" id="css--outlinedSizeSmall"></a><a href="#css--outlinedSizeSmall" class="prop-name">outlinedSizeSmall</a> | <span class="prop-name">.MuiButton-outlinedSizeSmall</span> | Styles applied to the root element if `size="small"` and `variant="outlined"`.
| <a class="anchor-link" id="css--outlinedSizeLarge"></a><a href="#css--outlinedSizeLarge" class="prop-name">outlinedSizeLarge</a> | <span class="prop-name">.MuiButton-outlinedSizeLarge</span> | Styles applied to the root element if `size="large"` and `variant="outlined"`.
| <a class="anchor-link" id="css--containedSizeSmall"></a><a href="#css--containedSizeSmall" class="prop-name">containedSizeSmall</a> | <span class="prop-name">.MuiButton-containedSizeSmall</span> | Styles applied to the root element if `size="small"` and `variant="contained"`.
| <a class="anchor-link" id="css--containedSizeLarge"></a><a href="#css--containedSizeLarge" class="prop-name">containedSizeLarge</a> | <span class="prop-name">.MuiButton-containedSizeLarge</span> | Styles applied to the root element if `size="large"` and `variant="contained"`.
| <a class="anchor-link" id="css--sizeSmall"></a><a href="#css--sizeSmall" class="prop-name">sizeSmall</a> | <span class="prop-name">.MuiButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <a class="anchor-link" id="css--sizeLarge"></a><a href="#css--sizeLarge" class="prop-name">sizeLarge</a> | <span class="prop-name">.MuiButton-sizeLarge</span> | Styles applied to the root element if `size="large"`.
| <a class="anchor-link" id="css--fullWidth"></a><a href="#css--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-name">.MuiButton-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.
| <a class="anchor-link" id="css--startIcon"></a><a href="#css--startIcon" class="prop-name">startIcon</a> | <span class="prop-name">.MuiButton-startIcon</span> | Styles applied to the startIcon element if supplied.
| <a class="anchor-link" id="css--endIcon"></a><a href="#css--endIcon" class="prop-name">endIcon</a> | <span class="prop-name">.MuiButton-endIcon</span> | Styles applied to the endIcon element if supplied.
| <a class="anchor-link" id="css--iconSizeSmall"></a><a href="#css--iconSizeSmall" class="prop-name">iconSizeSmall</a> | <span class="prop-name">.MuiButton-iconSizeSmall</span> | Styles applied to the icon element if supplied and `size="small"`.
| <a class="anchor-link" id="css--iconSizeMedium"></a><a href="#css--iconSizeMedium" class="prop-name">iconSizeMedium</a> | <span class="prop-name">.MuiButton-iconSizeMedium</span> | Styles applied to the icon element if supplied and `size="medium"`.
| <a class="anchor-link" id="css--iconSizeLarge"></a><a href="#css--iconSizeLarge" class="prop-name">iconSizeLarge</a> | <span class="prop-name">.MuiButton-iconSizeLarge</span> | Styles applied to the icon element if supplied and `size="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Buttons](/components/buttons/)

