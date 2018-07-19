---
filename: /packages/material-ui/src/Collapse/Collapse.js
title: Collapse API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Collapse

<p class="description">The API documentation of the Collapse React component.</p>

The Collapse transition is used by the
[Vertical Stepper](/demos/steppers#vertical-stepper) StepContent component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content node to be collapsed. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">collapsedHeight</span> | <span class="prop-type">string | <span class="prop-default">'0px'</span> | The height of the container when collapsed. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">in</span> | <span class="prop-type">bool |   | If `true`, the component will transition in. |
| <span class="prop-name">timeout</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | <span class="prop-default">duration.standard</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be spread to the root element ([Transition](https://reactcommunity.org/react-transition-group/#Transition)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">container</span> | Styles applied to the container element.
| <span class="prop-name">entered</span> | Styles applied to the container element when the transition has entered.
| <span class="prop-name">wrapper</span> | Styles applied to the outer wrapper element.
| <span class="prop-name">wrapperInner</span> | Styles applied to the outer wrapper element.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Collapse/Collapse.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCollapse`.

## Inheritance

The properties of the [Transition](https://reactcommunity.org/react-transition-group/#Transition) component, from react-transition-group, are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Cards](/demos/cards)
- [Lists](/demos/lists)
- [Transitions](/utils/transitions)

