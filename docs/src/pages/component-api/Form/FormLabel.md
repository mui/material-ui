# FormLabel



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| disabled | bool |  | If `true`, the label should be displayed in a disabled state. |
| error | bool |  | If `true`, the label should be displayed in an error state. |
| focused | bool |  | If `true`, the input of this label is focused (used by `FormGroup` components). |
| required | bool |  | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `focused`
- `error`
- `disabled`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormLabel`.
