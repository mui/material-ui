---
filename: /packages/material-ui/src/AppBar/AppBar.js
title: AppBar API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AppBar

<p class="description">The API documentation of the AppBar React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'default'<br> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">position</span> | <span class="prop-type">enum:&nbsp;'fixed'&nbsp;&#124;<br>&nbsp;'absolute'&nbsp;&#124;<br>&nbsp;'sticky'&nbsp;&#124;<br>&nbsp;'static'<br> | <span class="prop-default">'fixed'</span> | The positioning type. The behavior of the different options is described [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning). Note: `sticky` is not universally supported and will fall back to `static` when unavailable. |

Any other properties supplied will be spread to the root element ([Paper](/api/paper)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">positionFixed</span> | Styles applied to the root element if `position="fixed"`.
| <span class="prop-name">positionAbsolute</span> | Styles applied to the root element if `position="absolute"`.
| <span class="prop-name">positionSticky</span> | Styles applied to the root element if `position="sticky"`.
| <span class="prop-name">positionStatic</span> | Styles applied to the root element if `position="static"`.
| <span class="prop-name">colorDefault</span> | Styles applied to the root element if `color="default"`.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/AppBar/AppBar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAppBar`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [App Bar](/demos/app-bar)

