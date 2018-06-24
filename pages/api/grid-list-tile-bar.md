---
filename: /packages/material-ui/src/GridListTileBar/GridListTileBar.js
title: API of GridListTileBar
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTileBar

<p class="description">The API documentation of the GridListTileBar React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">actionIcon</span> | <span class="prop-type">node |   | An IconButton element to be used as secondary action target (primary action target is the tile itself). |
| <span class="prop-name">actionPosition</span> | <span class="prop-type">enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'right'<br> | <span class="prop-default">'right'</span> | Position of secondary action IconButton. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">subtitle</span> | <span class="prop-type">node |   | String or element serving as subtitle (support text). |
| <span class="prop-name">title</span> | <span class="prop-type">node |   | Title to be displayed on tile. |
| <span class="prop-name">titlePosition</span> | <span class="prop-type">enum:&nbsp;'top'&nbsp;&#124;<br>&nbsp;'bottom'<br> | <span class="prop-default">'bottom'</span> | Position of the title bar. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `titlePositionBottom`
- `titlePositionTop`
- `rootSubtitle`
- `titleWrap`
- `titleWrapActionPosLeft`
- `titleWrapActionPosRight`
- `title`
- `subtitle`
- `actionIcon`
- `actionIconActionPosLeft`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/GridListTileBar/GridListTileBar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridListTileBar`.

## Demos

- [Grid List](/demos/grid-list)

