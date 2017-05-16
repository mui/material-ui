Input
=====

Input

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  | The CSS class name of the wrapper element. |
| component | union:&nbsp;string<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. It's an `input` by default. |
| defaultValue | string |  | The default value of the `Input` element. |
| disabled | bool | false | If `true`, the input will be disabled. |
| disableUnderline | bool | false | If `true`, the input will not have an underline. |
| error | bool |  | If `true`, the input will indicate an error. |
| id | string |  |  |
| inputClassName | string |  | The CSS class name of the input element. |
| inputProps | object |  | Properties applied to the `input` element. |
| multiline | bool | false | If `true`, a textarea element will be rendered. |
| rows | union:&nbsp;string<br>&nbsp;number<br> |  | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string<br>&nbsp;number<br> |  | Maxium number of rows to display when multiline option is set to true. |
| type | string | 'text' | Type of the input element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The input value, required for a controlled component. |

Any other properties supplied will be spread to the root element.
