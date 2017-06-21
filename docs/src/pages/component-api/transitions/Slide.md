# Slide



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| direction | enum:&nbsp;'left'<br>&nbsp;'right'<br>&nbsp;'up'<br>&nbsp;'down'<br> | 'down' | Direction the child element will enter from. |
| enterTransitionDuration | number | duration.enteringScreen | Duration of the animation when the element is entering. |
| in | bool |  | If `true`, show the component; triggers the enter or exit animation. |
| leaveTransitionDuration | number | duration.leavingScreen | Duration of the animation when the element is exiting. |
| offset | string |  | Slide in by a fixed number of pixels or %. |
| onEnter | function |  | Callback fired before the component enters. |
| onEntering | function |  | Callback fired when the component is entering. |
| onEntered | function |  | Callback fired when the component has entered. |
| onExit | function |  | Callback fired before the component exits. |
| onExiting | function |  | Callback fired when the component is exiting. |
| onExited | function |  | Callback fired when the component has exited. |

Any other properties supplied will be spread to the root element.

