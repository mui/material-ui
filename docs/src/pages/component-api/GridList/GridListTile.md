<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTile



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Theoretically you can pass any node as children, but the main use case is to pass an img, in which case GridListTile takes care of making the image "cover" available space (similar to `background-size: cover` or to `object-fit: cover`). |
| classes | object |  | Useful to extend the style applied to components. |
| cols | number | 1 | Width of the tile in number of grid cells. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'li' | The component used for the root node. Either a string to use a DOM element or a component. |
| rows | number | 1 | Height of the tile in number of grid cells. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `tile`
- `imgFullHeight`
- `imgFullWidth`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGridListTile`.
