---
filename: /packages/material-ui/src/CardMedia/CardMedia.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardMedia API

<p class="description">The API documentation of the CardMedia React component. Learn more about the properties and the CSS customization points.</p>

```js
import CardMedia from '@material-ui/core/CardMedia';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | Component for rendering image. Either a string to use a DOM element or a component. |
| <span class="prop-name">image</span> | <span class="prop-type">string</span> |  | Image to be displayed as a background image. Either `image` or `src` prop must be specified. Note that caller must specify height otherwise the image will not be visible. |
| <span class="prop-name">src</span> | <span class="prop-type">string</span> |  | An alias for `image` property. Available only with media components. Media components: `video`, `audio`, `picture`, `iframe`, `img`. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">media</span> | Styles applied to the root element if `component="video, audio, picture, iframe, or img"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CardMedia/CardMedia.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiCardMedia`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Cards](/components/cards/)

