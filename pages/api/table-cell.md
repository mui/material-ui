---
filename: /src/Table/TableCell.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableCell



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | The table cell contents. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | ElementType |  | The component used for the root node. Either a string to use a DOM element or a component. |
| numeric | boolean | false | If `true`, content will align to the right. |
| padding | union:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'checkbox'&nbsp;&#124;<br>&nbsp;'dense'&nbsp;&#124;<br>&nbsp;'none'<br> | 'default' | Sets the padding applied to the cell. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `numeric`
- `head`
- `paddingDefault`
- `paddingDense`
- `paddingCheckbox`
- `footer`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Table/TableCell.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableCell`.

## Demos

- [Tables](/demos/tables)

