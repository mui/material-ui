---
filename: /packages/material-ui/src/Icon/Icon.js
title: Icon API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Icon

<p class="description">The API documentation of the Icon React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The name of the icon font ligature. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit', 'primary', 'secondary', 'action', 'error', 'disabled'<br> | <span class="prop-default">'inherit'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">fontSize</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'default'<br> | <span class="prop-default">'default'</span> | The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorAction</span> | Styles applied to the root element if `color="action"`.
| <span class="prop-name">colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">colorDisabled</span> | Styles applied to the root element if `color="disabled"`.
| <span class="prop-name">fontSizeInherit</span> | 

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Icon/Icon.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIcon`.

## Demos

- [Icons](/style/icons)

