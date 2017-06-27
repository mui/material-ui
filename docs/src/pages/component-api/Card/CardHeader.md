# CardHeader



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| avatar | Element |  | The Avatar  for the Card Header. |
| classes | Object |  | Useful to extend the style applied to components. |
| subheader | Element |  | The content of the component. |
| title | Element |  | The content of the Card Title. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `avatar`
- `content`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCardHeader`.
