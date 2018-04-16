---
filename: /src/Card/CardMedia.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardMedia



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'div'</span> | Component for rendering image. Either a string to use a DOM element or a component. |
| <span class="prop-name">image</span> | <span class="prop-type">string |  | Image to be displayed as a background image. Either `image` or `src` prop must be specified. Note that caller must specify height otherwise the image will not be visible. |
| <span class="prop-name">src</span> | <span class="prop-type">string |  | An alias for `image` property. Available only with media components. Media components: `video`, `audio`, `picture`, `iframe`, `img`. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `media`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Card/CardMedia.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCardMedia`.

## Demos

- [Cards](/demos/cards)

