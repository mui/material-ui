# ListItemIcon

A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | element |  | The content of the component, normally `Icon`, `SvgIcon`, or a `material-ui-icons` SVG icon component. |
| classes | object |  | Useful to extend the style applied to components. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItemIcon`.
