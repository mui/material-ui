# RadioGroup



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| name | string |  | The name used to reference the value of the control. |
| onChange | function |  | Callback fired when a radio button is selected.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* `change` event<br>*checked:* The `checked` value of the switch |
| selectedValue | string |  | Value of the selected radio button |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiRadioGroup`.
