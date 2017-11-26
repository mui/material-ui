---
filename: /src/Badge/Badge.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Badge



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">badgeContent *</span> | Node |  | The content rendered within the badge. |
| <span style="color: #31a148">children *</span> | Node |  | The badge will be added relative to this node. |
| classes | Object |  | Useful to extend the style applied to components. |
| color | union:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'accent'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `badge`
- `colorPrimary`
- `colorAccent`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Badge/Badge.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBadge`.

## Demos

- [Badges](/demos/badges)

