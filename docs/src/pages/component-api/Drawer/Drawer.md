Drawer
======

This is a drawer.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| anchor | enum:&nbsp;'left'<br>&nbsp;'top'<br>&nbsp;'right'<br>&nbsp;'bottom'<br> | 'left' | Side from which the drawer will appear. |
| children | node |  | The contents of the drawer. |
| className | string |  | The CSS class name of the root element. |
| docked | bool | false | If `true`, the drawer will dock itself and will no longer slide in with an overlay. |
| elevation | number | 16 | The elevation of the drawer. |
| enterTransitionDuration | number | duration.enteringScreen | Customizes duration of enter animation (ms) |
| leaveTransitionDuration | number | duration.leavingScreen | Customizes duration of leave animation (ms) |
| onRequestClose | function |  | Callback fired when the internal modal requests to be closed. |
| open | bool | false | If `true`, the drawer is open. |
| paperClassName | string |  | The CSS class name of the paper element. |
| slideFromOutsideSelf | bool | false | If `false`, let the drawer slide in from outside the viewport. Set to `true` to let the drawer slide in from outside its own bounding box and position. Only works on `temporary` and `persistent` drawers. |
| type | enum:<br>&nbsp;'permanent'<br>&nbsp;'persistent'<br>&nbsp;'mini'<br>&nbsp;'temporary'<br> | 'temporary' | The type of drawer. See the [Material Design Guidelines](https://material.io/guidelines/patterns/navigation-drawer.html) for more info. Note that for the `persistent`and `mini` variant to work, you must set a width via paperClassName. For the `mini` variant, you also have to wrap the drawer's children in a container with the same fixed width set via paperClassName. |

Any other properties supplied will be spread to the root element.
