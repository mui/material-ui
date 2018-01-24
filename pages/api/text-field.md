---
filename: /src/TextField/TextField.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TextField

The `TextField` is a convenience wrapper for the most common cases (80%).
It cannot be all things to all people, otherwise the API would grow out of control.

## Advanced Configuration

It's important to understand that the text field is a simple abstraction
on top of the following components:
- [FormControl](/api/form-control)
- [InputLabel](/api/input-label)
- [Input](/api/input)
- [FormHelperText](/api/form-helper-text)

If you wish to alter the properties applied to the native input, you can do as follow:

```jsx
const inputProps = {
  step: 300,
};

return <TextField id="time" type="time" inputProps={inputProps} />;
```

For advanced cases, please look at the source of TextField by clicking on the
"Edit this page" button above. Consider either:
- using the upper case props for passing values direct to the components.
- using the underlying components directly as shown in the demos.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| autoComplete | string |  | This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it here: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill |
| autoFocus | bool |  | If `true`, the input will be focused during the first mount. |
| defaultValue | string |  | The default value of the `Input` element. |
| disabled | bool |  | If `true`, the input will be disabled. |
| error | bool |  | If `true`, the label will be displayed in an error state. |
| FormHelperTextProps | object |  | Properties applied to the `FormHelperText` element. |
| fullWidth | bool |  | If `true`, the input will take up the full width of its container. |
| helperText | node |  | The helper text content. |
| helperTextClassName | string |  | The CSS class name of the helper text element. |
| id | string |  | The id of the `input` element. Use that property to make `label` and `helperText` accessible for screen readers. |
| InputLabelProps | object |  | Properties applied to the `InputLabel` element. |
| InputProps | object |  | Properties applied to the `Input` element. |
| inputProps | object |  | Properties applied to the native `input` element. |
| inputRef | func |  | Use that property to pass a ref callback to the native input component. |
| label | node |  | The label content. |
| labelClassName | string |  | The CSS class name of the label element. |
| margin | enum:&nbsp;'none'&nbsp;&#124;<br>&nbsp;'dense'&nbsp;&#124;<br>&nbsp;'normal'<br> |  | If `dense` or `normal`, will adjust vertical spacing of this and contained components. |
| multiline | bool |  | If `true`, a textarea element will be rendered instead of an input. |
| name | string |  | Name attribute of the `input` element. |
| onChange | func |  | Callback fired when the value is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| placeholder | string |  | The short hint displayed in the input before the user enters a value. |
| required | bool | false | If `true`, the label is displayed as required. |
| rows | union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br> |  | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br> |  | Maximum number of rows to display when multiline option is set to true. |
| select | bool | false | Render a `Select` element while passing the `Input` element to `Select` as `input` parameter. If this option is set you must pass the options of the select as children. |
| SelectProps | object |  | Properties applied to the `Select` element. |
| type | string |  | Type attribute of the `Input` element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string&nbsp;&#124;<br>&nbsp;number&nbsp;&#124;<br>&nbsp;{name?: undefined, value?: undefined}<br> |  | The value of the `Input` element, required for a controlled component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [&lt;FormControl /&gt;](/api/form-control) component are also available.

## Demos

- [Autocomplete](/demos/autocomplete)
- [Pickers](/demos/pickers)
- [Text Fields](/demos/text-fields)

