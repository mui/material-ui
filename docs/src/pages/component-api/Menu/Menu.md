# Menu



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| MenuListProps | Object |  | Properties applied to the `MenuList` element. |
| anchorEl | Object |  | The DOM element used to set the position of the menu. |
| children | Element |  | Menu contents, normally `MenuItem`s. |
| classes | Object |  | Useful to extend the style applied to components. |
| onEnter | Function |  | Callback fired before the Menu enters. |
| onEntered | Function |  | Callback fired when the Menu has entered. |
| onEntering | Function |  | Callback fired when the Menu is entering. |
| onExit | Function |  | Callback fired before the Menu exits. |
| onExited | Function |  | Callback fired when the Menu has exited. |
| onExiting | Function |  | Callback fired when the Menu is exiting. |
| onRequestClose | Function |  | Callback function fired when the menu is requested to be closed. |
| open | boolean | false | If `true`, the menu is visible. |
| transitionDuration | union:&nbsp;number<br>&nbsp;'auto'<br> | 'auto' | The length of the transition in `ms`, or 'auto' |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMenu`.
