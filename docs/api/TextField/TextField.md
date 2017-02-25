TextField
=========

TextField

@see https://material.google.com/components/text-fields.html

```js
import TextField from 'material-ui/TextField';

const Component = () => <TextField value="Hello World">;
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  | The CSS class name of the root element. |
| disabled | bool |  | If `true`, the input will be disabled. |
| error | bool |  | Whether the label should be displayed in an error state. |
| id | string |  |  |
| inputClassName | string |  | The CSS class name of the input element. |
| inputProps | object |  | Properties applied to the internal `<Input />` component. |
| label | node |  | The label text. |
| labelClassName | string |  | The CSS class name of the label element. |
| required | bool | false | Whether the label should be displayed as required (asterisk). |
| type | string |  | Type of the input element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The input value, required for a controlled component. |

Any other properties supplied will be spread to the root element.
