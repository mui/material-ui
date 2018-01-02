---
filename: /src/transitions/Zoom.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Zoom

The Zoom transition is used by the SpeedDial component.
It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | element |  | A single child content element. |
| enterDelay | number | 0 | The duration before the enter animation starts in milliseconds. |
| in | bool |  | If `true`, the component will transition in. |
| timeout | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [&lt;Transition /&gt;](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Buttons](/demos/buttons)

