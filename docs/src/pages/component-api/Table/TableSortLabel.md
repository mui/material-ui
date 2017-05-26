# TableSortLabel

A button based label for placing inside `TableCell` for column sorting.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| active | bool | false | If `true`, the label will have the active styling (should be true for the sorted column). |
| children | node |  | Label contents, the arrow will be appended automatically. |
| classes | object |  | Useful to extend the style applied to components. |
| direction | enum:&nbsp;'asc'<br>&nbsp;'desc'<br> | 'desc' | The current sort direction. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `sortLabel`
- `active`
- `icon`
- `desc`
- `asc`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableSortLabel`.
