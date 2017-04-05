Radio
=====

[Radio buttons](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-radio-button)
are switches used for selection from multiple options.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool<br>&nbsp;string<br> |  | If `true`, the component appears selected. |
| checkedClassName | string |  | The CSS class name of the root element when selected. |
| checkedIcon | node |  | The icon to display when selected. |
| className | string |  | The CSS class name of the root element. |
| disabled | bool |  | If `true`, the component disabled. |
| disabledClassName | string |  | The CSS class name of the root element when disabled. |
| icon | node |  | The icon to display when the component is unselected. |
| name | string |  |  |
| onChange | function |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* `change` event<br>*checked:* The `checked` value of the switch |
| ripple | bool |  | If `false`, the ripple effect will be disabled. |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.
