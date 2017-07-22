GridTile
========

```sx
<GridTile>
  <img src="image.jpg" />
  <GridTileTitlebar title="GridTile" />
</GridTile>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | Theoretically you can pass any node as children, but the main use case is to pass an img, in which case GridTile takes care of making the image "cover" available space (similar to `background-size: cover` or to `object-fit: cover`). |
| className | string |  | The CSS `className` of the root element. |
| cols | number | 1 | Width of the tile in number of grid cells. |
| containerElement | union:&nbsp;string<br>&nbsp;element<br> | 'div' | Either a string used as tag name for the tile root element, or a ReactElement. This is useful when you have, for example, a custom implementation of a navigation link (that knows about your routes) and you want to use it as the primary tile action. In case you pass a ReactElement, please ensure that it passes all props, accepts styles overrides and render it's children. |
| rows | number | 1 | Height of the tile in number of grid cells. |

Any other properties supplied will be spread to the root element.
