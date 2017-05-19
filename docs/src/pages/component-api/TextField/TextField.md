# TextField



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| defaultValue | string |  | The default value of the `Input` element. |
| disabled | bool |  | If `true`, the input will be disabled. |
| error | bool |  | If `true`, the label will be displayed in an error state. |
| id | string |  |  |
| inputClassName | string |  | The CSS class name of the `Input` element. |
| inputProps | object |  | Properties applied to the `input` element. |
| InputProps | object |  | Properties applied to the `Input` element. |
| inputRef | function |  | Use that property to pass a ref callback to the native input component. |
| label | node |  | The label content. |
| labelClassName | string |  | The CSS class name of the label element. |
| multiline | bool |  | If `true`, a textarea element will be rendered instead of an input. |
| name | string |  | Name attribute of the `Input` element. |
| required | bool | false | If `true`, the label is displayed as required. |
| rows | union:&nbsp;string<br>&nbsp;number<br> |  | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string<br>&nbsp;number<br> |  | Maxium number of rows to display when multiline option is set to true. |
| type | string |  | Type attribute of the `Input` element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The value of the `Input` element, required for a controlled component. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `null`.
