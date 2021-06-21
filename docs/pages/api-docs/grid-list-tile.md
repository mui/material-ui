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



## Component name

The `MuiGridListTile` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Theoretically you can pass any node as children, but the main use case is to pass an img, in which case GridListTile takes care of making the image "cover" available space (similar to `background-size: cover` or to `object-fit: cover`). |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">cols</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Width of the tile in number of grid cells. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">rows</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Height of the tile in number of grid cells. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiGridListTile-root</span> | Styles applied to the root element.
| <span class="prop-name">tile</span> | <span class="prop-name">.MuiGridListTile-tile</span> | Styles applied to the `div` element that wraps the children.
| <span class="prop-name">imgFullHeight</span> | <span class="prop-name">.MuiGridListTile-imgFullHeight</span> | Styles applied to an `img` element child, if needed to ensure it covers the tile.
| <span class="prop-name">imgFullWidth</span> | <span class="prop-name">.MuiGridListTile-imgFullWidth</span> | Styles applied to an `img` element child, if needed to ensure it covers the tile.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridListTile/GridListTile.js) for more detail.

## Demos

- [Grid List](/components/grid-list/)

