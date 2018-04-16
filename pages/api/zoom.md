---
filename: /packages/material-ui/src/transitions/Zoom.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Zoom

The Zoom transition can be used for the floating variant of the
[Button](https://material-ui-next.com/demos/buttons/#floating-action-buttons) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">union:&nbsp;element&nbsp;&#124;<br>&nbsp;func<br> |  | A single child content element. |
| <span class="prop-name">in</span> | <span class="prop-type">bool |  | If `true`, the component will transition in. |
| <span class="prop-name">timeout</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [Transition](https://reactcommunity.org/react-transition-group/#Transition) component, from react-transition-group, are also available.

## Demos

- [Buttons](/demos/buttons)
- [Transitions](/utils/transitions)

