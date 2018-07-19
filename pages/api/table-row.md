---
filename: /packages/material-ui/src/TableRow/TableRow.js
title: TableRow API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableRow

<p class="description">The API documentation of the TableRow React component.</p>

Will automatically set dynamic row height
based on the material table element parent (head, body, etc).

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Should be valid &lt;tr> children such as `TableCell`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'tr'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">hover</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the table row will shade on hover. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the table row will have the selected shading. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">selected</span> | Styles applied to the root element if `context.table` & `selected={true}`.
| <span class="prop-name">hover</span> | Styles applied to the root element if `context.table` & `hover={true}`.
| <span class="prop-name">head</span> | Styles applied to the root element if `context.table.head`.
| <span class="prop-name">footer</span> | Styles applied to the root element if `context.table.footer`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/TableRow/TableRow.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableRow`.

## Demos

- [Tables](/demos/tables)

