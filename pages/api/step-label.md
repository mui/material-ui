---
filename: /src/Stepper/StepLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepLabel



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Node |  | In most cases will simply be a string containing a title for the label. |
| classes | Object |  | Custom styles for component. |
| disabled | boolean | false | Mark the step as disabled, will also disable the button if `StepLabelButton` is a child of `StepLabel`. Is passed to child components. |
| icon | Icon |  | The icon displayed by the step label - if not set will be set by Step component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `horizontal`
- `vertical`
- `active`
- `completed`
- `disabled`
- `iconContainer`
- `iconContainerNoAlternative`
- `alternativeLabelRoot`
- `alternativeLabel`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Stepper/StepLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepLabel`.

## Demos

- [Stepper](/demos/stepper)

