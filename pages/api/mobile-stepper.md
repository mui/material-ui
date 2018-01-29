---
filename: /src/MobileStepper/MobileStepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MobileStepper



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| activeStep | number | 0 | Set the active step (zero based index). Defines which dot is highlighted when the variant is 'dots'. |
| backButton | node |  | A back button element. For instance, it can be be a `Button` or a `IconButton`. |
| classes | object |  | Useful to extend the style applied to components. |
| nextButton | node |  | A next button element. For instance, it can be be a `Button` or a `IconButton`. |
| position | enum:&nbsp;'bottom'&nbsp;&#124;<br>&nbsp;'top'&nbsp;&#124;<br>&nbsp;'static'<br> | 'bottom' | Set the positioning type. |
| <span style="color: #31a148">steps *</span> | number |  | The total steps. |
| variant | enum:&nbsp;'text'&nbsp;&#124;<br>&nbsp;'dots'&nbsp;&#124;<br>&nbsp;'progress'<br> | 'dots' | The type of mobile stepper to use. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

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
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/MobileStepper/MobileStepper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMobileStepper`.

## Inheritance

The properties of the [&lt;Paper /&gt;](/api/paper) component are also available.

## Demos

- [Stepper](/demos/stepper)

