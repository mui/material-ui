---
filename: /src/Table/TablePaginationActions.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TablePaginationActions



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| backIconButtonProps | object |  | Properties applied to the back arrow `IconButton` component. |
| classes | object |  | Useful to extend the style applied to components. |
| <span style="color: #31a148">count *</span> | number |  | The total number of rows. |
| nextIconButtonProps | object |  | Properties applied to the next arrow `IconButton` component. |
| <span style="color: #31a148">onChangePage *</span> | func |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback<br>*page:* The page selected |
| <span style="color: #31a148">page *</span> | number |  | The zero-based index of the current page. |
| <span style="color: #31a148">rowsPerPage *</span> | number |  | The number of rows per page. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Table/TablePaginationActions.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTablePaginationActions`.

