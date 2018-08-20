---
filename: /packages/material-ui/src/Stepper/Stepper.js
title: Stepper API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Stepper

<p class="description">The API documentation of the Stepper React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">activeStep</span> | <span class="prop-type">number | <span class="prop-default">0</span> | Set the active step (zero based index). |
| <span class="prop-name">alternativeLabel</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon. |
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | Two or more `&lt;Step />` components. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">connector</span> | <span class="prop-type">element | <span class="prop-default">&lt;StepConnector /></span> | A component to be placed between each step. |
| <span class="prop-name">nonLinear</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If set the `Stepper` will not assist in controlling steps for linear flow. |
| <span class="prop-name">orientation</span> | <span class="prop-type">enum:&nbsp;'horizontal'&nbsp;&#124;<br>&nbsp;'vertical'<br> | <span class="prop-default">'horizontal'</span> | The stepper orientation (layout flow direction). |

Any other properties supplied will be spread to the root element ([Paper](/api/paper)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Stepper/Stepper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepper`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Steppers](/demos/steppers)

