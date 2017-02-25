Input
=====

Input

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  | The CSS class name of the wrapper element. |
| component | union:&nbsp;string<br>&nbsp;element<br> | 'input' | The component used for the root node. Either a string to use a DOM element or a ReactElement. |
| disabled | bool | false | If `true`, the input will be disabled. |
| error | bool |  |  |
| inputClassName | string |  | The CSS class name of the input element. |
| type | string | 'text' | Type of the input element. It should be a valid HTML5 input type. |
| underline | bool | true | If set to true, the input will have an underline. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The input value, required for a controlled component. |

Any other properties supplied will be spread to the root element.
