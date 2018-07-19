---
filename: /packages/material-ui/src/Toolbar/Toolbar.js
title: Toolbar API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Toolbar

<p class="description">The API documentation of the Toolbar React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, disables gutter padding. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'regular'&nbsp;&#124;<br>&nbsp;'dense'<br> | <span class="prop-default">'regular'</span> | The variant to use. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">gutters</span> | Styles applied to the root element if `disableGutters={false}`.
| <span class="prop-name">regular</span> | Styles applied to the root element if `variant="regular"`.
| <span class="prop-name">dense</span> | Styles applied to the root element if `variant="dense"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Toolbar/Toolbar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiToolbar`.

## Demos

- [App Bar](/demos/app-bar)

