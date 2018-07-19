---
filename: /packages/material-ui/src/InputAdornment/InputAdornment.js
title: InputAdornment API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputAdornment

<p class="description">The API documentation of the InputAdornment React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | The content of the component, normally an `IconButton` or string. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disableTypography</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If children is a string then disable wrapping in a Typography component. |
| <span class="prop-name">position</span> | <span class="prop-type">enum:&nbsp;'start'&nbsp;&#124;<br>&nbsp;'end'<br> |   | The position this adornment should appear relative to the `Input`. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">positionStart</span> | Styles applied to the root element if `position="start"`.
| <span class="prop-name">positionEnd</span> | Styles applied to the root element if `position="end"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/InputAdornment/InputAdornment.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiInputAdornment`.

## Demos

- [Text Fields](/demos/text-fields)

