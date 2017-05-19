# Badge



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If `true`, the badge will use the accent badge colors. |
| badgeClassName | string |  | The CSS class name of the badge element. |
| <span style="color: #31a148">badgeContent *</span> | node |  | The content rendered within the badge. |
| <span style="color: #31a148">children *</span> | node |  | The badge will be added relative to this node. |
| classes | object |  | Useful to extend the style applied to components. |
| primary | bool | false | If `true`, the badge will use the primary badge colors. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `badge`
- `primary`
- `accent`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBadge`.
