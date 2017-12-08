---
filename: /src/Stepper/Step.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Step



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| active | boolean | false | Sets the step as active. Is passed to child components. |
| children | Node |  | Should be `Step` sub-components such as `StepLabel`, `StepContent`. |
| completed | boolean | false | Mark the step as completed. Is passed to child components. |
| disabled | boolean | false | Mark the step as disabled, will also disable the button if `StepButton` is a child of `Step`. Is passed to child components. |
| optional | boolean | false | Define this step as optional. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `horizontal`
- `alternativeLabel`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Stepper/Step.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStep`.

## Demos

- [Stepper](/demos/stepper)

