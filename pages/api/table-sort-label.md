---
filename: /packages/material-ui/src/Table/TableSortLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableSortLabel

A button based label for placing inside `TableCell` for column sorting.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">active</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the label will have the active styling (should be true for the sorted column). |
| <span class="prop-name">children</span> | <span class="prop-type">node |  | Label contents, the arrow will be appended automatically. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">direction</span> | <span class="prop-type">enum:&nbsp;'asc'&nbsp;&#124;<br>&nbsp;'desc'<br> | <span class="prop-default">'desc'</span> | The current sort direction. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `active`
- `icon`
- `iconDirectionDesc`
- `iconDirectionAsc`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/Table/TableSortLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableSortLabel`.

## Inheritance

The properties of the [ButtonBase](/api/button-base) component are also available.

## Demos

- [Tables](/demos/tables)

