---
filename: /src/Stepper/StepContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepContent



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Node |  | Step content. |
| transition | Function | Collapse | Collapse component. |
| <span style="color: #31a148">transitionDuration *</span> | TransitionDuration | 'auto' | Adjust the duration of the content expand transition. Passed as a property to the transition component. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `last`
- `transition`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/Stepper/StepContent.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `undefined`.

## Demos

- [Stepper](/demos/stepper)

