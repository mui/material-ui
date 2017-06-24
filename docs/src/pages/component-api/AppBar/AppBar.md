# AppBar



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'inherit'<br>&nbsp;'primary'<br>&nbsp;'accent'<br>&nbsp;'default'<br> | 'primary' | The color of the component. It's using the theme palette when that makes sense. |
| position | enum:&nbsp;'static'<br>&nbsp;'fixed'<br>&nbsp;'absolute'<br> | 'fixed' | The positioning type. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `positionFixed`
- `positionAbsolute`
- `positionStatic`
- `colorDefault`
- `colorPrimary`
- `colorAccent`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAppBar`.
