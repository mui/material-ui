---
filename: /packages/material-ui/src/SvgIcon/SvgIcon.js
title: SvgIcon API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SvgIcon

<p class="description">The API documentation of the SvgIcon React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | Node passed into the SVG element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit', 'primary', 'secondary', 'action', 'error', 'disabled'<br> | <span class="prop-default">'inherit'</span> | The color of the component. It supports those theme colors that make sense for this component. You can use the `nativeColor` property to apply a color attribute to the SVG element. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'svg'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">fontSize</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'default'<br> | <span class="prop-default">'default'</span> | The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. |
| <span class="prop-name">nativeColor</span> | <span class="prop-type">string |   | Applies a color attribute to the SVG element. |
| <span class="prop-name">titleAccess</span> | <span class="prop-type">string |   | Provides a human-readable title for the element that contains it. https://www.w3.org/TR/SVG-access/#Equivalent |
| <span class="prop-name">viewBox</span> | <span class="prop-type">string | <span class="prop-default">'0 0 24 24'</span> | Allows you to redefine what the coordinates without units mean inside an SVG element. For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20", this means that the coordinates inside the SVG will go from the top left corner (0,0) to bottom right (50,20) and each unit will be worth 10px. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorAction</span> | Styles applied to the root element if `color="saction"`.
| <span class="prop-name">colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">colorDisabled</span> | Styles applied to the root element if `color="disabled"`.
| <span class="prop-name">fontSizeInherit</span> | Styles applied to the root element if `fontSize="inherit"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/SvgIcon/SvgIcon.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSvgIcon`.

## Demos

- [Icons](/style/icons)

