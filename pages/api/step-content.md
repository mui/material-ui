---
filename: /packages/material-ui/src/Stepper/StepContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepContent



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |  | Step content. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">func | <span class="prop-default">Collapse</span> | Collapse component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | <span class="prop-default">'auto'</span> | Adjust the duration of the content expand transition. Passed as a property to the transition component.<br>Set to 'auto' to automatically calculate transition time based on height. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object |  | Properties applied to the `Transition` element. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `last`
- `transition`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/Stepper/StepContent.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepContent`.

## Demos

- [Steppers](/demos/steppers)

