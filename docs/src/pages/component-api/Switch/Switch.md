# Switch



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool<br>&nbsp;string<br> |  | If `true`, the component appears selected. |
| checkedClassName | string |  | The CSS class name of the root element when checked. |
| checkedIcon | node |  | The icon to display when the component is checked. |
| classes | object |  | Useful to extend the style applied to components. |
| disabled | bool |  | If `true`, the switch will be disabled. |
| disabledClassName | string |  | The CSS class name of the root element when disabled. |
| icon | node |  | The icon to display when the component is unchecked. If a string is provided, it will be used as a font ligature. |
| inputProps | object |  | Properties applied to the `input` element. |
| name | string |  |  |
| onChange | function |  | Callback fired when the  is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* `change` event<br>*checked:* The `checked` value of the switch |
| ripple | bool |  | If `false`, the ripple effect will be disabled. |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `default`
- `checked`
- `disabled`
- `bar`
- `icon`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSwitch`.
