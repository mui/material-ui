---
filename: /src/Table/TableRow.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableRow

Will automatically set dynamic row height
based on the material table element parent (head, body, etc).

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |  | Should be valid `&lt;tr>` children such as `TableCell`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'tr'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">hover</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the table row will shade on hover. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the table row will have the selected shading. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `head`
- `footer`
- `selected`
- `hover`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Table/TableRow.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableRow`.

## Demos

- [Tables](/demos/tables)

