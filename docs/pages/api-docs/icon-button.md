---
filename: /packages/material-ui/src/IconButton/IconButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# IconButton API

<p class="description">The API documentation of the IconButton React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import IconButton from '@material-ui/core/IconButton';
// or
import { IconButton } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Refer to the [Icons](/components/icons/) section of the documentation
regarding the available icon options.

## Component name

The `MuiIconButton` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The icon element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">edge</span> | <span class="prop-type">'start'<br>&#124;&nbsp;'end'<br>&#124;&nbsp;false</span> | <span class="prop-default">false</span> | If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape). |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiIconButton-root</span> | Styles applied to the root element.
| <span class="prop-name">edgeStart</span> | <span class="prop-name">.MuiIconButton-edgeStart</span> | Styles applied to the root element if `edge="start"`.
| <span class="prop-name">edgeEnd</span> | <span class="prop-name">.MuiIconButton-edgeEnd</span> | Styles applied to the root element if `edge="end"`.
| <span class="prop-name">colorInherit</span> | <span class="prop-name">.MuiIconButton-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiIconButton-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiIconButton-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiIconButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiIconButton-label</span> | Styles applied to the children container element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/IconButton/IconButton.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Buttons](/components/buttons/)
- [Grid List](/components/grid-list/)

