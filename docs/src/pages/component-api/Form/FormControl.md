# FormControl

Provides context such as dirty/focused/error/required for form inputs.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The contents of the form control. |
| classes | object |  | Useful to extend the style applied to components. |
| error | bool | false | If `true`, the label should be displayed in an error state. |
| required | bool | false | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `row`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormControl`.
