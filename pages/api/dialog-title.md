---
filename: /packages/material-ui/src/DialogTitle/DialogTitle.js
title: DialogTitle API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# DialogTitle

<p class="description">The API documentation of the DialogTitle React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disableTypography</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a typography component. For instance, this can be useful to render an h4 instead of the default h2. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/DialogTitle/DialogTitle.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDialogTitle`.

## Demos

- [Dialogs](/demos/dialogs)

