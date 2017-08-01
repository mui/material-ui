<!--- This documentation is automatically generated, do not try to edit it. -->

# FormGroup

FormGroup wraps controls such as Checkbox and Switch.
It provides compact row layout and FormLabel awareness.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| row | boolean | false | Display group of elements in a compact row. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `row`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormGroup`.
