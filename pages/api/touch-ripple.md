---
filename: /packages/material-ui/src/ButtonBase/TouchRipple.js
title: TouchRipple API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TouchRipple

<p class="description">The API documentation of the TouchRipple React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">center</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the ripple starts at the center of the component rather than at the point of interaction. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">ripple</span> | Styles applied to the internal `Ripple` components `ripple` class.
| <span class="prop-name">rippleVisible</span> | Styles applied to the internal `Ripple` components `rippleVisible` class.
| <span class="prop-name">ripplePulsate</span> | Styles applied to the internal `Ripple` components `ripplePulsate` class.
| <span class="prop-name">child</span> | Styles applied to the internal `Ripple` components `child` class.
| <span class="prop-name">childLeaving</span> | Styles applied to the internal `Ripple` components `childLeaving` class.
| <span class="prop-name">childPulsate</span> | Styles applied to the internal `Ripple` components `childPulsate` class.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/ButtonBase/TouchRipple.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTouchRipple`.

