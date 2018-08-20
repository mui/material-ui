---
filename: /packages/material-ui/src/StepContent/StepContent.js
title: StepContent API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepContent

<p class="description">The API documentation of the StepContent React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Step content. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">func | <span class="prop-default">Collapse</span> | Collapse component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | <span class="prop-default">'auto'</span> | Adjust the duration of the content expand transition. Passed as a property to the transition component.<br>Set to 'auto' to automatically calculate transition time based on height. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object |   | Properties applied to the `Transition` element. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">last</span> | Styles applied to the root element if `last={true}` (controlled by `Step`).
| <span class="prop-name">transition</span> | Styles applied to the Transition component.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/StepContent/StepContent.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepContent`.

## Demos

- [Steppers](/demos/steppers)

