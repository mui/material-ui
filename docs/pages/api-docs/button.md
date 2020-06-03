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



## Component name

The `MuiButton` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableElevation</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, no elevation is used. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled.<br>⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `focusVisibleClassName`. |
| <span class="prop-name">endIcon</span> | <span class="prop-type">node</span> |  | Element placed after the children. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will take up the full width of its container. |
| <span class="prop-name">href</span> | <span class="prop-type">string</span> |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <span class="prop-name">size</span> | <span class="prop-type">'large'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">startIcon</span> | <span class="prop-type">node</span> |  | Element placed before the children. |
| <span class="prop-name">variant</span> | <span class="prop-type">'contained'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'text'</span> | <span class="prop-default">'text'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiButton-root</span> | Styles applied to the root element.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiButton-label</span> | Styles applied to the span element that wraps the children.
| <span class="prop-name">text</span> | <span class="prop-name">.MuiButton-text</span> | Styles applied to the root element if `variant="text"`.
| <span class="prop-name">textPrimary</span> | <span class="prop-name">.MuiButton-textPrimary</span> | Styles applied to the root element if `variant="text"` and `color="primary"`.
| <span class="prop-name">textSecondary</span> | <span class="prop-name">.MuiButton-textSecondary</span> | Styles applied to the root element if `variant="text"` and `color="secondary"`.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiButton-outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <span class="prop-name">outlinedPrimary</span> | <span class="prop-name">.MuiButton-outlinedPrimary</span> | Styles applied to the root element if `variant="outlined"` and `color="primary"`.
| <span class="prop-name">outlinedSecondary</span> | <span class="prop-name">.MuiButton-outlinedSecondary</span> | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
| <span class="prop-name">contained</span> | <span class="prop-name">.MuiButton-contained</span> | Styles applied to the root element if `variant="contained"`.
| <span class="prop-name">containedPrimary</span> | <span class="prop-name">.MuiButton-containedPrimary</span> | Styles applied to the root element if `variant="contained"` and `color="primary"`.
| <span class="prop-name">containedSecondary</span> | <span class="prop-name">.MuiButton-containedSecondary</span> | Styles applied to the root element if `variant="contained"` and `color="secondary"`.
| <span class="prop-name">disableElevation</span> | <span class="prop-name">.MuiButton-disableElevation</span> | Styles applied to the root element if `disableElevation={true}`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the ButtonBase root element if the button is keyboard focused.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">colorInherit</span> | <span class="prop-name">.MuiButton-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">textSizeSmall</span> | <span class="prop-name">.MuiButton-textSizeSmall</span> | Styles applied to the root element if `size="small"` and `variant="text"`.
| <span class="prop-name">textSizeLarge</span> | <span class="prop-name">.MuiButton-textSizeLarge</span> | Styles applied to the root element if `size="large"` and `variant="text"`.
| <span class="prop-name">outlinedSizeSmall</span> | <span class="prop-name">.MuiButton-outlinedSizeSmall</span> | Styles applied to the root element if `size="small"` and `variant="outlined"`.
| <span class="prop-name">outlinedSizeLarge</span> | <span class="prop-name">.MuiButton-outlinedSizeLarge</span> | Styles applied to the root element if `size="large"` and `variant="outlined"`.
| <span class="prop-name">containedSizeSmall</span> | <span class="prop-name">.MuiButton-containedSizeSmall</span> | Styles applied to the root element if `size="small"` and `variant="contained"`.
| <span class="prop-name">containedSizeLarge</span> | <span class="prop-name">.MuiButton-containedSizeLarge</span> | Styles applied to the root element if `size="large"` and `variant="contained"`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | <span class="prop-name">.MuiButton-sizeLarge</span> | Styles applied to the root element if `size="large"`.
| <span class="prop-name">fullWidth</span> | <span class="prop-name">.MuiButton-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.
| <span class="prop-name">startIcon</span> | <span class="prop-name">.MuiButton-startIcon</span> | Styles applied to the startIcon element if supplied.
| <span class="prop-name">endIcon</span> | <span class="prop-name">.MuiButton-endIcon</span> | Styles applied to the endIcon element if supplied.
| <span class="prop-name">iconSizeSmall</span> | <span class="prop-name">.MuiButton-iconSizeSmall</span> | Styles applied to the icon element if supplied and `size="small"`.
| <span class="prop-name">iconSizeMedium</span> | <span class="prop-name">.MuiButton-iconSizeMedium</span> | Styles applied to the icon element if supplied and `size="medium"`.
| <span class="prop-name">iconSizeLarge</span> | <span class="prop-name">.MuiButton-iconSizeLarge</span> | Styles applied to the icon element if supplied and `size="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Button Group](/components/button-group/)
- [Buttons](/components/buttons/)

