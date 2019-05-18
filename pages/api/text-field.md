---
filename: /packages/material-ui/src/TextField/TextField.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TextField API

<p class="description">The API documentation of the TextField React component. Learn more about the properties and the CSS customization points.</p>

```js
import TextField from '@material-ui/core/TextField';
```

The `TextField` is a convenience wrapper for the most common cases (80%).
It cannot be all things to all people, otherwise the API would grow out of control.

## Advanced Configuration

It's important to understand that the text field is a simple abstraction
on top of the following components:

- [FormControl](/api/form-control/)
- [InputLabel](/api/input-label/)
- [FilledInput](/api/filled-input/)
- [OutlinedInput](/api/outlined-input/)
- [Input](/api/input/)
- [FormHelperText](/api/form-helper-text/)

If you wish to alter the properties applied to the `input` element, you can do so as follows:

```jsx
const inputProps = {
  step: 300,
};

return <TextField id="time" type="time" inputProps={inputProps} />;
```

For advanced cases, please look at the source of TextField by clicking on the
"Edit this page" button above. Consider either:

- using the upper case props for passing values directly to the components
- using the underlying components directly as shown in the demos

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoComplete</span> | <span class="prop-type">string</span> |  | This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill). |
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be focused during the first mount. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default value of the `input` element. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be disabled. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, the label will be displayed in an error state. |
| <span class="prop-name">FormHelperTextProps</span> | <span class="prop-type">object</span> |  | Properties applied to the [`FormHelperText`](/api/form-helper-text/) element. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> |  | If `true`, the input will take up the full width of its container. |
| <span class="prop-name">helperText</span> | <span class="prop-type">node</span> |  | The helper text content. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The id of the `input` element. Use this property to make `label` and `helperText` accessible for screen readers. |
| <span class="prop-name">InputLabelProps</span> | <span class="prop-type">object</span> |  | Properties applied to the [`InputLabel`](/api/input-label/) element. |
| <span class="prop-name">InputProps</span> | <span class="prop-type">object</span> |  | Properties applied to the Input element. It will be a [`FilledInput`](/api/filled-input/), [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/) component depending on the `variant` prop value. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> |  | This property can be used to pass a ref callback to the `input` element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The label content. |
| <span class="prop-name">margin</span> | <span class="prop-type">enum:&nbsp;'none'&nbsp;&#124;<br>&nbsp;'dense'&nbsp;&#124;<br>&nbsp;'normal'<br></span> |  | If `dense` or `normal`, will adjust vertical spacing of this and contained components. |
| <span class="prop-name">multiline</span> | <span class="prop-type">bool</span> |  | If `true`, a textarea element will be rendered instead of an input. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value`. |
| <span class="prop-name">placeholder</span> | <span class="prop-type">string</span> |  | The short hint displayed in the input before the user enters a value. |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label is displayed as required and the `input` element` will be required. |
| <span class="prop-name">rows</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br></span> |  | Number of rows to display when multiline option is set to true. |
| <span class="prop-name">rowsMax</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br></span> |  | Maximum number of rows to display when multiline option is set to true. |
| <span class="prop-name">select</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Render a [`Select`](/api/select/) element while passing the Input element to `Select` as `input` parameter. If this option is set you must pass the options of the select as children. |
| <span class="prop-name">SelectProps</span> | <span class="prop-type">object</span> |  | Properties applied to the [`Select`](/api/select/) element. |
| <span class="prop-name">type</span> | <span class="prop-type">string</span> |  | Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types). |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the `input` element, required for a controlled component. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'standard'&nbsp;&#124;<br>&nbsp;'outlined'&nbsp;&#124;<br>&nbsp;'filled'<br></span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([FormControl](/api/form-control/)).

## Inheritance

The properties of the [FormControl](/api/form-control/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Autocomplete](/components/autocomplete/)
- [Pickers](/components/pickers/)
- [Text Fields](/components/text-fields/)

