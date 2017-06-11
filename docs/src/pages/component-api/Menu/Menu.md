# Menu



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| anchorEl | object |  | The DOM element used to set the position of the menu. |
| children | node |  | Menu contents, normally `MenuItem`s. |
| classes | object |  | Useful to extend the style applied to components. |
| MenuListProps | object |  | Properties applied to the `MenuList` element. |
| onEnter | function |  | Callback fired before the Menu enters. |
| onEntering | function |  | Callback fired when the Menu is entering. |
| onEntered | function |  | Callback fired when the Menu has entered. |
| onExit | function |  | Callback fired before the Menu exits. |
| onExiting | function |  | Callback fired when the Menu is exiting. |
| onExited | function |  | Callback fired when the Menu has exited. |
| onRequestClose | function |  | Callback function fired when the menu is requested to be closed.<br><br>**Signature:**<br>`function(event: event) => void`<br>*event:* The event that triggered the close request |
| open | bool | false | If `true`, the menu is visible. |
| transitionDuration | union:&nbsp;number<br>&nbsp;string<br> | 'auto' | The length of the transition in `ms`, or 'auto' |

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
