---
filename: /packages/material-ui/src/NotchedOutline/NotchedOutline.js
title: NotchedOutline API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# NotchedOutline

<p class="description">The API documentation of the NotchedOutline React component.</p>

```js
import NotchedOutline from '@material-ui/core/NotchedOutline';
```

An outline for form control elements which opens to fit a label.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |   | If `true`, the outline should be displayed in a disabled state. |
| <span class="prop-name">error</span> | <span class="prop-type">bool |   | If `true`, the outline should be displayed in an error state. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool |   | If `true`, the outline should be displayed in a focused state. |
| <span class="prop-name">notched</span> | <span class="prop-type">bool |   | If `true`, the outline is notched to accommodate text. |
| <span class="prop-name">NotchProps</span> | <span class="prop-type">object | <span class="prop-default">{}</span> | The width of the notch, where a label will be placed. |
| <span class="prop-name required">notchWidth *</span> | <span class="prop-type">number |   | Props applied to the notch element. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">legend</span> | Styles applied to the legend element.
| <span class="prop-name">focused</span> | Styles applied to the root element if the control is focused.
| <span class="prop-name">error</span> | Styles applied to the root element if `error={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/NotchedOutline/NotchedOutline.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiNotchedOutline`.

