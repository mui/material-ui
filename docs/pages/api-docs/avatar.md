---
filename: /packages/material-ui/src/Avatar/Avatar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Avatar API

<p class="description">The API documentation of the Avatar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Avatar from '@material-ui/core/Avatar';
// or
import { Avatar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiAvatar` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alt</span> | <span class="prop-type">string</span> |  | Used in combination with `src` or `srcSet` to provide an alt attribute for the rendered `img` element. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Used to render icon or text elements inside the Avatar if `src` is not set. This can be an element, or just a string. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">imgProps</span> | <span class="prop-type">object</span> |  | Attributes applied to the `img` element if the component is used to display an image. It can be used to listen for the loading error event. |
| <span class="prop-name">sizes</span> | <span class="prop-type">string</span> |  | The `sizes` attribute for the `img` element. |
| <span class="prop-name">src</span> | <span class="prop-type">string</span> |  | The `src` attribute for the `img` element. |
| <span class="prop-name">srcSet</span> | <span class="prop-type">string</span> |  | The `srcSet` attribute for the `img` element. Use this attribute for responsive image display. |
| <span class="prop-name">variant</span> | <span class="prop-type">'circle'<br>&#124;&nbsp;'rounded'<br>&#124;&nbsp;'square'</span> | <span class="prop-default">'circle'</span> | The shape of the avatar. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAvatar-root</span> | Styles applied to the root element.
| <span class="prop-name">colorDefault</span> | <span class="prop-name">.MuiAvatar-colorDefault</span> | Styles applied to the root element if not `src` or `srcSet`.
| <span class="prop-name">circle</span> | <span class="prop-name">.MuiAvatar-circle</span> | Styles applied to the root element if `variant="circle"`.
| <span class="prop-name">rounded</span> | <span class="prop-name">.MuiAvatar-rounded</span> | Styles applied to the root element if `variant="rounded"`.
| <span class="prop-name">square</span> | <span class="prop-name">.MuiAvatar-square</span> | Styles applied to the root element if `variant="square"`.
| <span class="prop-name">img</span> | <span class="prop-name">.MuiAvatar-img</span> | Styles applied to the img element if either `src` or `srcSet` is defined.
| <span class="prop-name">fallback</span> | <span class="prop-name">.MuiAvatar-fallback</span> | Styles applied to the fallback icon

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Avatar/Avatar.js) for more detail.

## Demos

- [Avatars](/components/avatars/)

