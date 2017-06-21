# Icon



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The name of the icon font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'inherit', 'accent', 'action', 'contrast', 'disabled', 'error', 'primary'<br> | 'inherit' | The color of the component. It's using the theme palette when that makes sense. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorAccent`
- `colorAction`
- `colorContrast`
- `colorDisabled`
- `colorError`
- `colorPrimary`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIcon`.
