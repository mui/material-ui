<!--- This documentation is automatically generated, do not try to edit it. -->

# GridList



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| cellHeight | union:&nbsp;number<br>&nbsp;[object Object]<br> | 180 | Number of px for one cell height. You can set `'auto'` if you want to let the children determine the height. |
| <span style="color: #31a148">children *</span> | node |  | Grid Tiles that will be in Grid List. |
| classes | object |  | Useful to extend the style applied to components. |
| cols | number | 2 | Number of columns. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'ul' | The component used for the root node. Either a string to use a DOM element or a component. By default we map the type to a good default headline component. |
| spacing | number | 4 | Number of px for the spacing between tiles. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridList`.
