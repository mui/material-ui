# AppBar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If `true`, the AppBar will use the theme's accent color. |
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `appBar`
- `primary`
- `accent`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAppBar`.
