---
filename: /packages/material-ui-lab/src/Backdrop/Backdrop.js
title: Backdrop API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Backdrop

<p class="description">The API documentation of the Backdrop React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |

Any other properties supplied will be spread to the root element ([Paper](/api/paper)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:

- `root`
- `colorPrimary`
- `colorSecondary`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/Backdrop/Backdrop.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBackdrop`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Backdrop](/lab/backdrop)

