---
filename: /src/transitions/Collapse.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Collapse

The Collapes transition is used by the
[Vetical Stepper](/demos/steppers#vertical-stepper) StepContent component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content node to be collapsed. |
| classes | object |  | Useful to extend the style applied to components. |
| collapsedHeight | string | '0px' | The height of the container when collapsed. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| in | bool |  | If `true`, the component will transition in. |
| timeout | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | duration.standard | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `container`
- `entered`
- `wrapper`
- `wrapperInner`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/transitions/Collapse.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCollapse`.

## Inheritance

The properties of the react-transition-group [Transition](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Cards](/demos/cards)
- [Lists](/demos/lists)
- [Transitions](/utils/transitions)

