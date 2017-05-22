# Icon



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If `true`, the button will use the theme's accent color. |
| action | bool | false | If `true`, the button will use the theme's action.active color. |
| children | node |  | The name of the icon font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| contrast | bool | false | If `true`, the button will contrast the theme's primary color. |
| disabled | bool | false | If `true`, the button will use the theme's action.disabled color. |
| error | bool | false | If `true`, the text will use the theme's error color. |
| primary | bool | false | If `true`, the button will use the theme's primary color. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `accent`
- `action`
- `contrast`
- `disabled`
- `error`
- `primary`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIcon`.
