<!--- This documentation is automatically generated, do not try to edit it. -->

# TableSortLabel

A button based label for placing inside `TableCell` for column sorting.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| active | boolean | false | If `true`, the label will have the active styling (should be true for the sorted column). |
| children | Node |  | Label contents, the arrow will be appended automatically. |
| classes | Object |  | Useful to extend the style applied to components. |
| direction | union:&nbsp;'asc'<br>&nbsp;'desc'<br> | 'desc' | The current sort direction. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `active`
- `icon`
- `desc`
- `asc`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableSortLabel`.

## Demos

- [Tables](/demos/tables)

