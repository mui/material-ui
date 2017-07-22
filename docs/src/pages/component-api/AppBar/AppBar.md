<!--- This documentation is automatically generated, do not try to edit it. -->

# AppBar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| color | union:&nbsp;'inherit'<br>&nbsp;'primary'<br>&nbsp;'accent'<br>&nbsp;'default'<br> | 'primary' | The color of the component. It's using the theme palette when that makes sense. |
| position | union:&nbsp;'static'<br>&nbsp;'fixed'<br>&nbsp;'absolute'<br> | 'fixed' | The positioning type. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `positionFixed`
- `positionAbsolute`
- `positionStatic`
- `colorDefault`
- `colorPrimary`
- `colorAccent`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAppBar`.
