---
filename: /src/Stepper/Stepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Stepper



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| activeStep | number | 0 | Set the active step (zero based index). |
| alternativeLabel | bool | false | If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon. |
| <span style="color: #31a148">children *</span> | node |  | Two or more `&lt;Step />` components. |
| classes | object |  | Useful to extend the style applied to components. |
| connector | element | &lt;StepConnector /> | A component to be placed between each step. |
| nonLinear | bool | false | If set the `Stepper` will not assist in controlling steps for linear flow. |
| orientation | enum:&nbsp;'horizontal'&nbsp;&#124;<br>&nbsp;'vertical'<br> | 'horizontal' | The stepper orientation (layout flow direction). |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `horizontal`
- `vertical`
- `alternativeLabel`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Stepper/Stepper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepper`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.

## Demos

- [Steppers](/demos/steppers)

