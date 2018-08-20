---
filename: /packages/material-ui/src/Backdrop/Backdrop.js
title: Backdrop API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Backdrop

<p class="description">The API documentation of the Backdrop React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">invisible</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the backdrop is invisible. It can be used when rendering a popover or a custom select component. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool |   | If `true`, the backdrop is open. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br> |   | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">invisible</span> | Styles applied to the root element if `invisible={true}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Backdrop/Backdrop.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBackdrop`.

