---
filename: /packages/material-ui/src/AppBar/AppBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AppBar



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'default'<br> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">position</span> | <span class="prop-type">enum:&nbsp;'fixed'&nbsp;&#124;<br>&nbsp;'absolute'&nbsp;&#124;<br>&nbsp;'sticky'&nbsp;&#124;<br>&nbsp;'static'<br> | <span class="prop-default">'fixed'</span> | The positioning type. The behavior of the different options is described [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning). Note: `sticky` is not universally supported and will fall back to `static` when unavailable. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `positionFixed`
- `positionAbsolute`
- `positionSticky`
- `positionStatic`
- `colorDefault`
- `colorPrimary`
- `colorSecondary`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/AppBar/AppBar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAppBar`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.

## Demos

- [App Bar](/demos/app-bar)

