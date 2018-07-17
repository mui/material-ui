---
filename: /packages/material-ui/src/ListItemAvatar/ListItemAvatar.js
title: ListItemAvatar API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemAvatar

<p class="description">The API documentation of the ListItemAvatar React component.</p>

This is a simple wrapper to apply the `dense` mode styles to `Avatar`.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">element |   | The content of the component – normally `Avatar`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">icon</span> | Styles applied to the children – typically the `Avatar` component.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/ListItemAvatar/ListItemAvatar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItemAvatar`.

## Demos

- [Lists](/demos/lists)

