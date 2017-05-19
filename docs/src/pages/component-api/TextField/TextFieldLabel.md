# TextFieldLabel



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| disableAnimation | bool | false | If `true`, the transition animation is disabled. |
| error | bool |  | If `true`, the label is displayed in an error state. |
| focused | bool |  | If `true`, the input of this label is focused. |
| required | bool |  | If `true`, the label will indicate that the input is required. |
| shrink | bool | false | If `true`, the label is shrunk. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `shrink`
- `animated`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTextFieldLabel`.
