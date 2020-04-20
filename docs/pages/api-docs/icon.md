---
filename: /packages/material-ui/src/Icon/Icon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Icon API

<p class="description">The API documentation of the Icon React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Icon from '@material-ui/core/Icon';
// or
import { Icon } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiIcon` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The name of the icon font ligature. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'action'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'disabled'</span> | <span class="prop-default">'inherit'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">fontSize</span> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'default'<br>&#124;&nbsp;'small'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'default'</span> | The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiIcon-root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiIcon-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiIcon-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorAction</span> | <span class="prop-name">.MuiIcon-colorAction</span> | Styles applied to the root element if `color="action"`.
| <span class="prop-name">colorError</span> | <span class="prop-name">.MuiIcon-colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">colorDisabled</span> | <span class="prop-name">.MuiIcon-colorDisabled</span> | Styles applied to the root element if `color="disabled"`.
| <span class="prop-name">fontSizeInherit</span> | <span class="prop-name">.MuiIcon-fontSizeInherit</span> | Styles applied to the root element if `fontSize="inherit"`.
| <span class="prop-name">fontSizeSmall</span> | <span class="prop-name">.MuiIcon-fontSizeSmall</span> | Styles applied to the root element if `fontSize="small"`.
| <span class="prop-name">fontSizeLarge</span> | <span class="prop-name">.MuiIcon-fontSizeLarge</span> | Styles applied to the root element if `fontSize="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Icon/Icon.js) for more detail.

## Demos

- [Icons](/components/icons/)
- [Material Icons](/components/material-icons/)

