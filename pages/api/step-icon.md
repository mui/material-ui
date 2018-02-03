---
filename: /src/Stepper/StepIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepIcon



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| active | bool | false | Whether this step is active. |
| classes | object |  | Classses for component style customizations. |
| completed | bool | false | Mark the step as completed. Is passed to child components. |
| <span style="color: #31a148">icon *</span> | node |  | The icon displayed by the step label. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `completed`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Stepper/StepIcon.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepIcon`.

## Demos

- [Steppers](/demos/steppers)

