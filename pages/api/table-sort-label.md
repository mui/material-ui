---
filename: /packages/material-ui/src/TableSortLabel/TableSortLabel.js
title: TableSortLabel API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableSortLabel

<p class="description">The API documentation of the TableSortLabel React component.</p>

A button based label for placing inside `TableCell` for column sorting.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">active</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the label will have the active styling (should be true for the sorted column). |
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Label contents, the arrow will be appended automatically. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">direction</span> | <span class="prop-type">enum:&nbsp;'asc'&nbsp;&#124;<br>&nbsp;'desc'<br> | <span class="prop-default">'desc'</span> | The current sort direction. |

Any other properties supplied will be spread to the root element ([ButtonBase](/api/button-base)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">active</span> | Styles applied to the root element if `active={true}`.
| <span class="prop-name">icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconDirectionDesc</span> | Styles applied to the icon component if `direction="desc"`.
| <span class="prop-name">iconDirectionAsc</span> | Styles applied to the icon component if `direction="asc"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/TableSortLabel/TableSortLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTableSortLabel`.

## Inheritance

The properties of the [ButtonBase](/api/button-base) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Tables](/demos/tables)

