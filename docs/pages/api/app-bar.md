---
filename: /packages/material-ui/src/AppBar/AppBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AppBar API

<p class="description">The API documentation of the AppBar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import AppBar from '@material-ui/core/AppBar';
// or
import { AppBar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--position"></a><a href="#props--position" class="prop-name">position</a> | <span class="prop-type">'absolute'<br>&#124;&nbsp;'fixed'<br>&#124;&nbsp;'relative'<br>&#124;&nbsp;'static'<br>&#124;&nbsp;'sticky'</span> | <span class="prop-default">'fixed'</span> | The positioning type. The behavior of the different options is described [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning). Note: `sticky` is not universally supported and will fall back to `static` when unavailable. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiAppBar`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiAppBar-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--positionFixed"></a><a href="#css--positionFixed" class="prop-name">positionFixed</a> | <span class="prop-name">.MuiAppBar-positionFixed</span> | Styles applied to the root element if `position="fixed"`.
| <a class="anchor-link" id="css--positionAbsolute"></a><a href="#css--positionAbsolute" class="prop-name">positionAbsolute</a> | <span class="prop-name">.MuiAppBar-positionAbsolute</span> | Styles applied to the root element if `position="absolute"`.
| <a class="anchor-link" id="css--positionSticky"></a><a href="#css--positionSticky" class="prop-name">positionSticky</a> | <span class="prop-name">.MuiAppBar-positionSticky</span> | Styles applied to the root element if `position="sticky"`.
| <a class="anchor-link" id="css--positionStatic"></a><a href="#css--positionStatic" class="prop-name">positionStatic</a> | <span class="prop-name">.MuiAppBar-positionStatic</span> | Styles applied to the root element if `position="static"`.
| <a class="anchor-link" id="css--positionRelative"></a><a href="#css--positionRelative" class="prop-name">positionRelative</a> | <span class="prop-name">.MuiAppBar-positionRelative</span> | Styles applied to the root element if `position="relative"`.
| <a class="anchor-link" id="css--colorDefault"></a><a href="#css--colorDefault" class="prop-name">colorDefault</a> | <span class="prop-name">.MuiAppBar-colorDefault</span> | Styles applied to the root element if `color="default"`.
| <a class="anchor-link" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiAppBar-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiAppBar-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/AppBar/AppBar.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [App Bar](/components/app-bar/)

