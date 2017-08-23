<!--- This documentation is automatically generated, do not try to edit it. -->

# Badge



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">badgeContent *</span> | node |  | The content rendered within the badge. |
| <span style="color: #31a148">children *</span> | node |  | The badge will be added relative to this node. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'default'<br>&nbsp;'primary'<br>&nbsp;'accent'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `badge`
- `colorPrimary`
- `colorAccent`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBadge`.

## Demos

- [Badges](/demos/badges)

