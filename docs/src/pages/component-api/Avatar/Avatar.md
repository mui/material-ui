<!--- This documentation is automatically generated, do not try to edit it. -->

# Avatar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| alt | string | '' | Used in combination with `src` or `srcSet` to provide an alt attribute for the rendered `img` element. |
| children | Element |  | Used to render icon or text elements inside the Avatar. `src` and `alt` props will not be used and no `img` will be rendered by default.<br>This can be an element, or just a string. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| imgProps | Object |  | Properties applied to the `img` element when the component is used to display an image. |
| sizes | string |  | The `sizes` attribute for the `img` element. |
| src | string |  | The `src` attribute for the `img` element. |
| srcSet | string |  | The `srcSet` attribute for the `img` element. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorDefault`
- `img`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAvatar`.
