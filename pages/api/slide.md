---
filename: /src/transitions/Slide.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slide



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Element |  | A single child content element. |
| <span style="color: #31a148">direction *</span> | union:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'right'&nbsp;&#124;<br>&nbsp;'up'&nbsp;&#124;<br>&nbsp;'down'<br> |  | Direction the child node will enter from. |
| <span style="color: #31a148">in *</span> | boolean |  | If `true`, show the component; triggers the enter or exit animation. |
| timeout | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [&lt;Transition /&gt;](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Dialogs](/demos/dialogs)

