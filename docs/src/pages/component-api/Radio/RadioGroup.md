<!--- This documentation is automatically generated, do not try to edit it. -->

# RadioGroup



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| name | string |  | The name used to reference the value of the control. |
| onChange | Function |  | Callback fired when a radio button is selected.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| selectedValue | string |  | Value of the selected radio button |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiRadioGroup`.
