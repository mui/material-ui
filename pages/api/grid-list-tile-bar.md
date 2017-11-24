---
filename: /src/GridList/GridListTileBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTileBar



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| actionIcon | Node |  | An IconButton element to be used as secondary action target (primary action target is the tile itself). |
| actionPosition | union:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'right'<br> | 'right' | Position of secondary action IconButton. |
| classes | Object |  | Useful to extend the style applied to components. |
| subtitle | Node |  | String or element serving as subtitle (support text). |
| <span style="color: #31a148">title *</span> | Node |  | Title to be displayed on tile. |
| titlePosition | union:&nbsp;'top'&nbsp;&#124;<br>&nbsp;'bottom'<br> | 'bottom' | Position of the title bar. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
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

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/GridList/GridListTileBar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridListTileBar`.

## Demos

- [Grid List](/demos/grid-list)

