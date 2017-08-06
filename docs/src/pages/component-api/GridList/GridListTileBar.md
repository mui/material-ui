<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTileBar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| actionIcon | element |  | An IconButton element to be used as secondary action target (primary action target is the tile itself). |
| actionPosition | enum:&nbsp;'left'<br>&nbsp;'right'<br> | 'right' | Position of secondary action IconButton. |
| classes | object |  | Useful to extend the style applied to components. |
| subtitle | node |  | String or element serving as subtitle (support text). |
| <span style="color: #31a148">title *</span> | node |  | Title to be displayed on tile. |
| titlePosition | enum:&nbsp;'top'<br>&nbsp;'bottom'<br> | 'bottom' | Position of the title bar. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `rootBottom`
- `rootTop`
- `rootWithSubtitle`
- `titleWrap`
- `titleWrapActionLeft`
- `titleWrapActionRight`
- `title`
- `subtitle`
- `actionIconPositionLeft`
- `childImg`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridListTileBar`.
