---
filename: /src/GridList/GridList.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridList



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| cellHeight | union:&nbsp;number&nbsp;&#124;<br>&nbsp;'auto'<br> | 180 | Number of px for one cell height. You can set `'auto'` if you want to let the children determine the height. |
| <span style="color: #31a148">children *</span> | Node |  | Grid Tiles that will be in Grid List. |
| classes | Object |  | Useful to extend the style applied to components. |
| cols | number | 2 | Number of columns. |
| component | ElementType | 'ul' | The component used for the root node. Either a string to use a DOM element or a component. By default we map the type to a good default headline component. |
| spacing | number | 4 | Number of px for the spacing between tiles. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/GridList/GridList.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridList`.

## Demos

- [Grid List](/demos/grid-list)

