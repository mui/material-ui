---
filename: /packages/material-ui/src/TableSortLabel/TableSortLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableSortLabel API

<p class="description">The API documentation of the TableSortLabel React component. Learn more about the properties and the CSS customization points.</p>

```js
import TableSortLabel from '@material-ui/core/TableSortLabel';
```

A button based label for placing inside `TableCell` for column sorting.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">active</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will have the active styling (should be true for the sorted column). |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Label contents, the arrow will be appended automatically. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">direction</span> | <span class="prop-type">enum:&nbsp;'asc'&nbsp;&#124;<br>&nbsp;'desc'<br></span> | <span class="prop-default">'desc'</span> | The current sort direction. |
| <span class="prop-name">hideSortIcon</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Hide sort icon when active is false. |
| <span class="prop-name">IconComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDownwardIcon</span> | Sort icon to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">active</span> | Styles applied to the root element if `active={true}`.
| <span class="prop-name">icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconDirectionDesc</span> | Styles applied to the icon component if `direction="desc"`.
| <span class="prop-name">iconDirectionAsc</span> | Styles applied to the icon component if `direction="asc"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableSortLabel/TableSortLabel.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTableSortLabel`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tables](/components/tables/)

