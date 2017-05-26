# Tab



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| disabled | bool | false | If `true`, the tab will be disabled. |
| icon | node |  | The icon element. If a string is provided, it will be used as a font ligature. |
| label | node |  | The label element. |
| labelClassName | string |  | The CSS class name of the label element. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `rootLabelIcon`
- `rootAccent`
- `rootAccentSelected`
- `rootAccentDisabled`
- `rootInherit`
- `rootInheritSelected`
- `rootInheritDisabled`
- `fullWidth`
- `labelContainer`
- `label`
- `labelWrapped`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTab`.
