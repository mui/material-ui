# FormControl

Provides context such as dirty/focused/error/required for form inputs.

## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The contents of the form control. |
| classes | object |  | Useful to extend the style applied to components. |
| disabled | bool | false | If `true`, the label, input and helper text should be displayed in a disabled state. |
| error | bool | false | If `true`, the label should be displayed in an error state. |
| marginForm | bool | false | If `true`, add the margin top and bottom required when used in a form. |
| required | bool | false | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `marginForm`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormControl`.
