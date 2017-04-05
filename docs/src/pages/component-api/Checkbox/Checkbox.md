Checkbox
========

[Checkboxes](https://material.io/guidelines/components/selection-controls.html#selection-controls-checkbox)
allow the user to select multiple options from a set.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool<br>&nbsp;string<br> |  | If `true`, the component is checked. |
| checkedClassName | string |  | The CSS class name of the root element when checked. |
| checkedIcon | node |  | The icon to display when the component is checked. |
| className | string |  | The CSS class name of the root element. |
| disabled | bool |  | If `true`, the switch will be disabled. |
| disabledClassName | string |  | The CSS class name of the root element when disabled. |
| icon | node |  | The icon to display when the component is unchecked. If a string is provided, it will be used as a font ligature. |
| name | string |  |  |
| onChange | function |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* `change` event<br>*checked:* The `checked` value of the switch |
| ripple | bool |  | If `false`, the ripple effect will be disabled. |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.
