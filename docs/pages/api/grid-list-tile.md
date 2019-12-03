---
filename: /packages/material-ui/src/GridListTile/GridListTile.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTile API

<p class="description">The API documentation of the GridListTile React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import GridListTile from '@material-ui/core/GridListTile';
// or
import { GridListTile } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Theoretically you can pass any node as children, but the main use case is to pass an img, in which case GridListTile takes care of making the image "cover" available space (similar to `background-size: cover` or to `object-fit: cover`). |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--cols"></a><a href="#props--cols" class="prop-name">cols</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Width of the tile in number of grid cells. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--rows"></a><a href="#props--rows" class="prop-name">rows</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Height of the tile in number of grid cells. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiGridListTile`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiGridListTile-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--tile"></a><a href="#css--tile" class="prop-name">tile</a> | <span class="prop-name">.MuiGridListTile-tile</span> | Styles applied to the `div` element that wraps the children.
| <a class="anchor-link" id="css--imgFullHeight"></a><a href="#css--imgFullHeight" class="prop-name">imgFullHeight</a> | <span class="prop-name">.MuiGridListTile-imgFullHeight</span> | Styles applied to an `img` element child, if needed to ensure it covers the tile.
| <a class="anchor-link" id="css--imgFullWidth"></a><a href="#css--imgFullWidth" class="prop-name">imgFullWidth</a> | <span class="prop-name">.MuiGridListTile-imgFullWidth</span> | Styles applied to an `img` element child, if needed to ensure it covers the tile.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridListTile/GridListTile.js) for more detail.

## Demos

- [Grid List](/components/grid-list/)

