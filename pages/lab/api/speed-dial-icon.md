---
filename: /packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js
title: SpeedDialIcon API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDialIcon

<p class="description">The API documentation of the SpeedDialIcon React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Useful to extend the style applied to components. |
| <span class="prop-name">icon</span> | <span class="prop-type">node |   | The icon to display in the SpeedDial Floating Action Button. |
| <span class="prop-name">openIcon</span> | <span class="prop-type">node |   | The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconOpen</span> | Styles applied to the icon component if `open={true}`.
| <span class="prop-name">iconWithOpenIconOpen</span> | Styles applied to the icon when and `openIcon` is provided & if `open={true}`.
| <span class="prop-name">openIcon</span> | Styles applied to the `openIcon` if provided.
| <span class="prop-name">openIconOpen</span> | Styles applied to the `openIcon` if provided & if `open={true}`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSpeedDialIcon`.

## Demos

- [Speed Dial](/lab/speed-dial)

