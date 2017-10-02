<!--- This documentation is automatically generated, do not try to edit it. -->

---
filename: /src/transitions/Slide.js
---

# Slide



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | A single child content element. |
| direction | union:&nbsp;'left'<br>&nbsp;'right'<br>&nbsp;'up'<br>&nbsp;'down'<br> | 'down' | Direction the child element will enter from. |
| in | boolean |  | If `true`, show the component; triggers the enter or exit animation. |
| onEnter | TransitionCallback |  | Callback fired before the component enters. |
| onEntered | TransitionCallback |  | Callback fired when the component has entered. |
| onEntering | TransitionCallback |  | Callback fired when the component is entering. |
| onExit | TransitionCallback |  | Callback fired before the component exits. |
| onExited | TransitionCallback |  | Callback fired when the component has exited. |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting. |
| transitionDuration | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

