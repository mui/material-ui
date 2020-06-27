---
filename: /packages/material-ui/src/Fab/Fab.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Fab API

<p class="description">The API documentation of the Fab React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Fab from '@material-ui/core/Fab';
// or
import { Fab } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiFab` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">href</span> | <span class="prop-type">string</span> |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <span class="prop-name">size</span> | <span class="prop-type">'large'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'large'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">variant</span> | <span class="prop-type">'extended'<br>&#124;&nbsp;'round'</span> | <span class="prop-default">'round'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiFab-root</span> | Styles applied to the root element.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiFab-label</span> | Styles applied to the span element that wraps the children.
| <span class="prop-name">primary</span> | <span class="prop-name">.MuiFab-primary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">secondary</span> | <span class="prop-name">.MuiFab-secondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">extended</span> | <span class="prop-name">.MuiFab-extended</span> | Styles applied to the root element if `variant="extended"`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the ButtonBase root element if the button is keyboard focused.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">colorInherit</span> | <span class="prop-name">.MuiFab-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiFab-sizeSmall</span> | Styles applied to the root element if `size="small"``.
| <span class="prop-name">sizeMedium</span> | <span class="prop-name">.MuiFab-sizeMedium</span> | Styles applied to the root element if `size="medium"``.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Fab/Fab.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Floating Action Button](/components/floating-action-button/)

