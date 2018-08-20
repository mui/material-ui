---
filename: /packages/material-ui/src/GridListTile/GridListTile.js
title: GridListTile API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTile

<p class="description">The API documentation of the GridListTile React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Theoretically you can pass any node as children, but the main use case is to pass an img, in which case GridListTile takes care of making the image "cover" available space (similar to `background-size: cover` or to `object-fit: cover`). |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">cols</span> | <span class="prop-type">number | <span class="prop-default">1</span> | Width of the tile in number of grid cells. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">rows</span> | <span class="prop-type">number | <span class="prop-default">1</span> | Height of the tile in number of grid cells. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">tile</span> | Styles applied to the `div` element that wraps the children.
| <span class="prop-name">imgFullHeight</span> | Styles applied to an `ing` element child, if if needed to ensure it covers the tile.
| <span class="prop-name">imgFullWidth</span> | Styles applied to an `ing` element child, if if needed to ensure it covers the tile.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/GridListTile/GridListTile.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridListTile`.

## Demos

- [Grid List](/demos/grid-list)

