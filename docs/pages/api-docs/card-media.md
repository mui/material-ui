---
filename: /packages/material-ui/src/CardMedia/CardMedia.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardMedia API

<p class="description">The API documentation of the CardMedia React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import CardMedia from '@material-ui/core/CardMedia';
// or
import { CardMedia } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiCardMedia` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">image</span> | <span class="prop-type">string</span> |  | Image to be displayed as a background image. Either `image` or `src` prop must be specified. Note that caller must specify height otherwise the image will not be visible. |
| <span class="prop-name">src</span> | <span class="prop-type">string</span> |  | An alias for `image` property. Available only with media components. Media components: `video`, `audio`, `picture`, `iframe`, `img`. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiCardMedia-root</span> | Styles applied to the root element.
| <span class="prop-name">media</span> | <span class="prop-name">.MuiCardMedia-media</span> | Styles applied to the root element if `component="video, audio, picture, iframe, or img"`.
| <span class="prop-name">img</span> | <span class="prop-name">.MuiCardMedia-img</span> | Styles applied to the root element if `component="picture or img"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CardMedia/CardMedia.js) for more detail.

## Demos

- [Cards](/components/cards/)

