Switch
======



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool<br>&nbsp;string<br> |  | If `true`, the component appears selected. |
| checkedClassName | string |  | The CSS class name of the root element when checked. |
| checkedIcon | node |  | The icon to display when the component is checked. |
| className | string |  | The CSS class name of the root element. |
| disabled | bool |  | If `true`, the switch will be disabled. |
| disabledClassName | string |  | The CSS class name of the root element when disabled. |
| icon | node |  | The icon to display when the component is unchecked. |
| name | string |  |  |
| onChange | function |  | Callback fired when the  is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* `change` event<br>*checked:* The `checked` value of the switch |
| ripple | bool |  | If `false`, the ripple effect will be disabled. |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.
