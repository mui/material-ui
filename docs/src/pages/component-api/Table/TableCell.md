# TableCell



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checkbox | bool | false | If `true`, the cell padding will be adjusted to accommodate a checkbox. |
| children | node |  | The table cell contents. |
| classes | object |  | Useful to extend the style applied to components. |
| compact | bool | false | If `true`, compact cell padding will be used to accommodate more content. |
| disablePadding | bool | false | If `true`, left/right cell padding will be disabled. |
| numeric | bool | false | If `true`, content will align to the right. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `numeric`
- `head`
- `padding`
- `compact`
- `checkbox`
- `footer`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableCell`.
