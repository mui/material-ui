---
filename: /src/transitions/Fade.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Fade



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | A single child content element. |
| in | boolean | false | If `true`, the component will transition in. |
| onEnter | TransitionCallback |  | Callback fired before the component enters. |
| onEntered | TransitionCallback |  | Callback fired when the component has entered. |
| onEntering | TransitionCallback |  | Callback fired when the component is entering. |
| onExit | TransitionCallback |  | Callback fired before the component exits. |
| onExited | TransitionCallback |  | Callback fired when the component has exited. |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting. |
| transitionDuration | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

