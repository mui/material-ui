---
filename: /packages/material-ui/src/SnackbarContent/SnackbarContent.js
title: SnackbarContent API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SnackbarContent

<p class="description">The API documentation of the SnackbarContent React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node |   | The action to display. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">message</span> | <span class="prop-type">node |   | The message to display. |

Any other properties supplied will be spread to the root element ([Paper](/api/paper)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">message</span> | Styles applied to the message wrapper element.
| <span class="prop-name">action</span> | Styles applied to the action wrapper element if `action` is provided.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/SnackbarContent/SnackbarContent.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSnackbarContent`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Snackbars](/demos/snackbars)

