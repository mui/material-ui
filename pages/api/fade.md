---
filename: /src/transitions/Fade.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Fade

The Fade transition is used by the [Modal](/demos/modals) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">union:&nbsp;element&nbsp;&#124;<br>&nbsp;func<br> |  | A single child content element. |
| <span class="prop-name">in</span> | <span class="prop-type">bool |  | If `true`, the component will transition in. |
| <span class="prop-name">timeout</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the react-transition-group [Transition](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Transitions](/utils/transitions)

