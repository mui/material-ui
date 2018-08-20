---
filename: /packages/material-ui/src/StepConnector/StepConnector.js
title: StepConnector API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepConnector

<p class="description">The API documentation of the StepConnector React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.
| <span class="prop-name">line</span> | Styles applied to the line element.
| <span class="prop-name">lineHorizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">lineVertical</span> | Styles applied to the root element if `orientation="vertical"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/StepConnector/StepConnector.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepConnector`.

## Demos

- [Steppers](/demos/steppers)

