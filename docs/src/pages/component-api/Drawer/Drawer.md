# Drawer



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| anchor | enum:&nbsp;'left'<br>&nbsp;'top'<br>&nbsp;'right'<br>&nbsp;'bottom'<br> | 'left' | Side which will the drawer will appear from. |
| children | node |  | The contents of the drawer. |
| classes | object |  | Useful to extend the style applied to components. |
| docked | bool | false | If `true`, the drawer will dock itself and will no longer slide in with an overlay. |
| elevation | number | 16 | The elevation of the drawer. |
| enterTransitionDuration | number | duration.enteringScreen | Customizes duration of enter animation (ms) |
| leaveTransitionDuration | number | duration.leavingScreen | Customizes duration of leave animation (ms) |
| onRequestClose | function |  | Callback fired when the internal modal requests to be closed. |
| open | bool | false | If `true`, the drawer is open. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `paper`
- `anchorLeft`
- `anchorRight`
- `anchorTop`
- `anchorBottom`
- `docked`
- `modal`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDrawer`.
