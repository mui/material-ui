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

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The icon element. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <a class="anchor-link" id="props--disableFocusRipple"></a><a href="#props--disableFocusRipple" title="link to the prop on this page" class="prop-name">disableFocusRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" title="link to the prop on this page" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <a class="anchor-link" id="props--edge"></a><a href="#props--edge" title="link to the prop on this page" class="prop-name">edge</a> | <span class="prop-type">'start'<br>&#124;&nbsp;'end'<br>&#124;&nbsp;false</span> | <span class="prop-default">false</span> | If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape). |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" title="link to the prop on this page" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiIconButton`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiIconButton-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--edgeStart"></a><a href="#css--edgeStart" class="prop-name">edgeStart</a> | <span class="prop-name">.MuiIconButton-edgeStart</span> | Styles applied to the root element if `edge="start"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--edgeEnd"></a><a href="#css--edgeEnd" class="prop-name">edgeEnd</a> | <span class="prop-name">.MuiIconButton-edgeEnd</span> | Styles applied to the root element if `edge="end"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorInherit"></a><a href="#css--colorInherit" class="prop-name">colorInherit</a> | <span class="prop-name">.MuiIconButton-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiIconButton-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiIconButton-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--sizeSmall"></a><a href="#css--sizeSmall" class="prop-name">sizeSmall</a> | <span class="prop-name">.MuiIconButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiIconButton-label</span> | Styles applied to the children container element.

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

