<!--- This documentation is automatically generated, do not try to edit it. -->

# MenuItem



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | Menu item contents. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| selected | boolean | false | Use to apply selected styling. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `selected`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMenuItem`.
