<!--- This documentation is automatically generated, do not try to edit it. -->

# TextField



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| FormHelperTextProps | Object |  | Properties applied to the `FormHelperText` element. |
| InputClassName | string |  | The CSS class name of the `Input` element. |
| InputLabelProps | Object |  | Properties applied to the `InputLabel` element. |
| InputProps | Object |  | Properties applied to the `Input` element. |
| autoComplete | string |  | This property helps users to fill forms faster, especially on mobile devices. The name can be confusion, it's more like an autofill. You can learn about it with that article https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill |
| autoFocus | boolean |  | If `true`, the input will be focused during the first mount. |
| defaultValue | string |  | The default value of the `Input` element. |
| disabled | boolean |  | If `true`, the input will be disabled. |
| error | boolean |  | If `true`, the label will be displayed in an error state. |
| fullWidth | boolean |  | If `true`, the input will take up the full width of its container. |
| helperText | union:&nbsp;string<br>&nbsp;Element<*><br> |  | The helper text content. |
| helperTextClassName | string |  | The CSS class name of the helper text element. |
| id | string |  | The id of the `input` element. |
| inputClassName | string |  | The CSS class name of the `input` element. |
| inputProps | Object |  | Properties applied to the `input` element. |
| inputRef | Function |  | Use that property to pass a ref callback to the native input component. |
| label | union:&nbsp;string<br>&nbsp;Element<*><br> |  | The label content. |
| labelClassName | string |  | The CSS class name of the label element. |
| margin | union:&nbsp;'none'<br>&nbsp;'dense'<br>&nbsp;'normal'<br> |  | If `dense` | `normal`, will adjust vertical spacing of this and contained components. |
| multiline | boolean |  | If `true`, a textarea element will be rendered instead of an input. |
| name | string |  | Name attribute of the `Input` element. |
| placeholder | string |  |  |
| required | boolean | false | If `true`, the label is displayed as required. |
| rootRef | Function |  | Use that property to pass a ref callback to the root component. |
| rows | union:&nbsp;string<br>&nbsp;number<br> |  | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string<br>&nbsp;number<br> |  | Maximum number of rows to display when multiline option is set to true. |
| type | string |  | Type attribute of the `Input` element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The value of the `Input` element, required for a controlled component. |

Any other properties supplied will be spread to the root element.


## Inheritance

The properties of the [&lt;FormControl /&gt;](/api/form-control) component are also available.

## Demos

- [Autocomplete](/demos/autocomplete)
- [Text Fields](/demos/text-fields)

