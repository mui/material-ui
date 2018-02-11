---
filename: /src/transitions/Slide.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slide

The Slide transition is used by the [Snackbar](/demos/snackbars) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | union:&nbsp;element&nbsp;&#124;<br>&nbsp;func<br> |  | A single child content element. |
| direction | enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'right'&nbsp;&#124;<br>&nbsp;'up'&nbsp;&#124;<br>&nbsp;'down'<br> | 'down' | Direction the child node will enter from. |
| in | bool |  | If `true`, show the component; triggers the enter or exit animation. |
| timeout | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the react-transition-group [Transition](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Dialogs](/demos/dialogs)
- [Transitions](/utils/transitions/transitions)

