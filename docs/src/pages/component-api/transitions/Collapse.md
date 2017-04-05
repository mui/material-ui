Collapse
========



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content node to be collapsed. |
| containerClassName | string |  | The CSS class name passed to the wrapping container required for holding & measuring the expanding content. |
| in | bool | false | If `true` the component will transition in. |
| onEnter | function |  | Callback fired before the component is entering. |
| onEntering | function |  | Callback fired when the component is entering. |
| onEntered | function |  | Callback fired when the component has entered. |
| onExit | function |  | Callback fired before the component is exiting. |
| onExiting | function |  | Callback fired when the component is exiting. |
| onExited | function |  | Callback fired when the component has exited. |
| transitionDuration | union:&nbsp;number<br>&nbsp;string<br> | 300 | Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be spread to the root element.
