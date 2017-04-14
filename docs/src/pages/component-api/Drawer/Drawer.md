Drawer
======

This is a drawer.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| anchor | enum:&nbsp;'left'<br>&nbsp;'top'<br>&nbsp;'right'<br>&nbsp;'bottom'<br> | 'left' | Side which will the drawer will appear from. |
| children | node |  | The contents of the drawer. |
| className | string |  | The CSS class name of the root element. |
| docked | bool | false | If `true`, the drawer will dock itself and will no longer slide in with an overlay. |
| elevation | number | 16 | The elevation of the drawer. |
| enterTransitionDuration | number | duration.enteringScreen | Customizes duration of enter animation (ms) |
| leaveTransitionDuration | number | duration.leavingScreen | Customizes duration of leave animation (ms) |
| onRequestClose | function |  | Callback fired when the internal modal requests to be closed. |
| open | bool | false | If `true`, the drawer is open. |
| paperClassName | string |  | The CSS class name of the paper element. |

Any other properties supplied will be spread to the root element.
