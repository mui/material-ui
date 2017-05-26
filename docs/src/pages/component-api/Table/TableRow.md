# TableRow

Will automatically set dynamic row height
based on the material table element parent (head, body, etc).

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Should be valid `<tr>` children such as `TableCell`. |
| classes | object |  | Useful to extend the style applied to components. |
| hover | bool | false | If `true`, the table row will shade on hover. |
| selected | bool | false | If `true`, the table row will have the selected shading. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `head`
- `footer`
- `hover`
- `selected`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableRow`.
