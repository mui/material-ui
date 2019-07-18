---
filename: /packages/material-ui/src/GridListTile/GridListTile.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTile API

<p class="description">The API documentation of the GridListTile React component. Learn more about the properties and the CSS customization points.</p>

```js
import GridListTile from '@material-ui/core/GridListTile';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Theoretically you can pass any node as children, but the main use case is to pass an img, in which case GridListTile takes care of making the image "cover" available space (similar to `background-size: cover` or to `object-fit: cover`). |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">cols</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Width of the tile in number of grid cells. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">rows</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Height of the tile in number of grid cells. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">tile</span> | Styles applied to the `div` element that wraps the children.
| <span class="prop-name">imgFullHeight</span> | Styles applied to an `img` element child, if needed to ensure it covers the tile.
| <span class="prop-name">imgFullWidth</span> | Styles applied to an `img` element child, if needed to ensure it covers the tile.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridListTile/GridListTile.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiGridListTile`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Grid List](/components/grid-list/)

