<!--- This documentation is automatically generated, do not try to edit it. -->

# Checkbox



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool<br>&nbsp;string<br> |  | If `true`, the component is checked. |
| checkedClassName | string |  | The CSS class name of the root element when checked. |
| checkedIcon | node |  | The icon to display when the component is checked. If a string is provided, it will be used as a font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| disableRipple | bool |  | If `true`, the ripple effect will be disabled. |
| disabled | bool |  | If `true`, the switch will be disabled. |
| disabledClassName | string |  | The CSS class name of the root element when disabled. |
| icon | node |  | The icon to display when the component is unchecked. If a string is provided, it will be used as a font ligature. |
| indeterminate | bool | false | If `true`, the component appears indeterminate. |
| indeterminateIcon | node | <IndeterminateCheckBoxIcon /> | The icon to display when the component is indeterminate. If a string is provided, it will be used as a font ligature. |
| inputProps | object |  | Properties applied to the `input` element. |
| inputRef | function |  | Use that property to pass a ref callback to the native input component. |
| name | string |  |  |
| onChange | function |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `default`
- `checked`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCheckbox`.
