---
filename: /packages/material-ui-lab/src/SpeedDialAction/SpeedDialAction.js
title: SpeedDialAction API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDialAction

<p class="description">The API documentation of the SpeedDialAction React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">ButtonProps</span> | <span class="prop-type">object |   | Properties applied to the [`Button`](/api/button) component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Useful to extend the style applied to components. |
| <span class="prop-name">delay</span> | <span class="prop-type">number | <span class="prop-default">0</span> | Adds a transition delay, to allow a series of SpeedDialActions to be animated. |
| <span class="prop-name required">icon *</span> | <span class="prop-type">node |   | The Icon to display in the SpeedDial Floating Action Button. |
| <span class="prop-name">tooltipTitle</span> | <span class="prop-type">node |   | Label to display in the tooltip. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root (`Tooltip`) component.
| <span class="prop-name">button</span> | Styles applied to the `Button` component.
| <span class="prop-name">buttonClosed</span> | Styles applied to the `Button` component if `open={false}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/SpeedDialAction/SpeedDialAction.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSpeedDialAction`.

## Demos

- [Speed Dial](/lab/speed-dial)

