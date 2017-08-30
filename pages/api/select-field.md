<!--- This documentation is automatically generated, do not try to edit it. -->

# SelectField



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| FormHelperTextProps | Object |  | Properties applied to the `FormHelperText` element. |
| InputClassName | string |  | The CSS class name of the `Input` element. |
| InputLabelProps | Object |  | Properties applied to the `InputLabel` element. |
| InputProps | Object |  | Properties applied to the `Input` element. |
| autoFocus | boolean |  | If `true`, the input will be focused during the first mount. |
| children | Element |  | The `MenuItem` elements to populate the select field with. |
| compareFunction | Function | (currentValue, itemValue) => currentValue === itemValue | Custom compare function. |
| defaultValue | string |  | The default value of the `Input` element. |
| disabled | boolean | false | If `true`, the input will be disabled. |
| error | boolean |  | If `true`, the label will be displayed in an error state. |
| fullWidth | boolean |  | If `true`, the input will take up the full width of its container. |
| helperText | union:&nbsp;string<br>&nbsp;Element<*><br> |  | The helper text content. |
| helperTextClassName | string |  | The CSS class name of the helper text element. |
| hideLabel | boolean |  | If `true`, the label will be hidden when option is selected. |
| id | string |  | The id of the `input` element. |
| inputClassName | string |  | The CSS class name of the `input` element. |
| inputProps | Object |  | Properties applied to the `input` element. |
| inputRef | Function |  | Use that property to pass a ref callback to the native input component. |
| label | union:&nbsp;string<br>&nbsp;Element<*><br> |  | The label content. |
| labelClassName | string |  | The CSS class name of the label element. |
| menuClassName | string |  | The CSS class name of the `Menu` element. |
| menuProps | Object |  | Properties applied to the internal `<Menu />` component. |
| name | string |  | Name attribute of the `Input` element. |
| onChange | Function |  | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object, key: number, payload: any) => void`<br>*event:* TouchTap event targeting the menu item that was selected.<br>*key:* The index of the selected menu item.<br>*payload:* The `value` prop of the selected menu item. |
| placeholder | string |  |  |
| required | boolean |  | If `true`, the label is displayed as required. |
| rootRef | Function |  | Use that property to pass a ref callback to the root component. |
| type | string |  | Type attribute of the `Input` element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The value of the `Input` element, required for a controlled component. |

Any other properties supplied will be spread to the root element.

## Inheritance

The properties of the [&lt;FormControl /&gt;](/api/form-control) component are also available.

## Demos

- [Select Fields](/demos/select-fields)


