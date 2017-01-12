Slide
=====



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  |  |
| className | string |  | The CSS class name of the root element. |
| direction | enum:&nbsp;'left'<br>&nbsp;'right'<br>&nbsp;'up'<br>&nbsp;'down'<br> | 'down' | Entering direction of the children element. |
| enterTransitionDuration | number | duration.enteringScreen | Duration of the animation when the element is entering the screen. |
| in | bool |  | Show the component; triggers the enter or exit animation. |
| leaveTransitionDuration | number | duration.leavingScreen | Duration of the animation when the element is leaving the screen. |
| offset | string |  | Set to slide in by a fixed number of pixels or %. |
| onEnter | function |  | Callback fired before the component is entering. |
| onEntering | function |  | Callback fired when the component is entering. |
| onEntered | function |  | Callback fired when the component has entered. |
| onExit | function |  | Callback fired before the component is exiting. |
| onExiting | function |  | Callback fired when the component is exiting. |
| onExited | function |  | Callback fired when the component has exited. |

Any other properties supplied will be spread to the root element.
