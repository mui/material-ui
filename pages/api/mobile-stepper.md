---
filename: /packages/material-ui/src/MobileStepper/MobileStepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MobileStepper



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">activeStep</span> | <span class="prop-type">number | <span class="prop-default">0</span> | Set the active step (zero based index). Defines which dot is highlighted when the variant is 'dots'. |
| <span class="prop-name">backButton</span> | <span class="prop-type">node |  | A back button element. For instance, it can be be a `Button` or a `IconButton`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">nextButton</span> | <span class="prop-type">node |  | A next button element. For instance, it can be be a `Button` or a `IconButton`. |
| <span class="prop-name">position</span> | <span class="prop-type">enum:&nbsp;'bottom'&nbsp;&#124;<br>&nbsp;'top'&nbsp;&#124;<br>&nbsp;'static'<br> | <span class="prop-default">'bottom'</span> | Set the positioning type. |
| <span class="prop-name required">steps *</span> | <span class="prop-type">number |  | The total steps. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'text'&nbsp;&#124;<br>&nbsp;'dots'&nbsp;&#124;<br>&nbsp;'progress'<br> | <span class="prop-default">'dots'</span> | The type of mobile stepper to use. |

Any other properties supplied will be spread to the root element ([Paper](/api/paper)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `positionBottom`
- `positionTop`
- `positionStatic`
- `dots`
- `dot`
- `dotActive`
- `progress`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/MobileStepper/MobileStepper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMobileStepper`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Steppers](/demos/steppers)

