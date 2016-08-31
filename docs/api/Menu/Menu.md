Menu
====



Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| anchorEl | object |  |  This is the DOM element that will be used to set the position of the menu. |
| children | node |  |  Menu contents, should be menu items. |
| className | string |  |  The CSS class name of the root element. |
| onEnter | function |  |  Callback fired before the Menu is entering. |
| onEntering | function |  |  Callback fired when the Menu is entering. |
| onEntered | function |  |  Callback fired when the Menu has entered. |
| onExit | function |  |  Callback fired before the Menu is exiting. |
| onExiting | function |  |  Callback fired when the Menu is exiting. |
| onExited | function |  |  Callback fired when the Menu has exited. |
| onRequestClose | function |  |  Callback function fired when the menu is requested to be closed.<br><br>**Signature:**<br>`function(event: event) => void`<br>*event:* The event that triggered the close request |
| open | bool | false |  If `true`, the menu is visible. |
| transitionDuration | union | 'auto' |  The length of the transition in `ms`, or 'auto' |

Other properties (no documented) are applied to the root element.
