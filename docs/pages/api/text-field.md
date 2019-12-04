---
filename: /packages/material-ui/src/TextField/TextField.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TextField API

<p class="description">The API documentation of the TextField React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TextField from '@material-ui/core/TextField';
// or
import { TextField } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

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

If you wish to alter the props applied to the `input` element, you can do so as follows:

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
| <a class="anchor-link" id="props--autoComplete"></a><a href="#props--autoComplete" title="link to the prop on this page" class="prop-name">autoComplete</a> | <span class="prop-type">string</span> |  | This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill). |
| <a class="anchor-link" id="props--autoFocus"></a><a href="#props--autoFocus" title="link to the prop on this page" class="prop-name">autoFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the `input` element will be focused during the first mount. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--defaultValue"></a><a href="#props--defaultValue" title="link to the prop on this page" class="prop-name">defaultValue</a> | <span class="prop-type">any</span> |  | The default value of the `input` element. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the `input` element will be disabled. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" title="link to the prop on this page" class="prop-name">error</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will be displayed in an error state. |
| <a class="anchor-link" id="props--FormHelperTextProps"></a><a href="#props--FormHelperTextProps" title="link to the prop on this page" class="prop-name">FormHelperTextProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`FormHelperText`](/api/form-helper-text/) element. |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" title="link to the prop on this page" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will take up the full width of its container. |
| <a class="anchor-link" id="props--helperText"></a><a href="#props--helperText" title="link to the prop on this page" class="prop-name">helperText</a> | <span class="prop-type">node</span> |  | The helper text content. |
| <a class="anchor-link" id="props--id"></a><a href="#props--id" title="link to the prop on this page" class="prop-name">id</a> | <span class="prop-type">string</span> |  | The id of the `input` element. Use this prop to make `label` and `helperText` accessible for screen readers. |
| <a class="anchor-link" id="props--InputLabelProps"></a><a href="#props--InputLabelProps" title="link to the prop on this page" class="prop-name">InputLabelProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`InputLabel`](/api/input-label/) element. |
| <a class="anchor-link" id="props--InputProps"></a><a href="#props--InputProps" title="link to the prop on this page" class="prop-name">InputProps</a> | <span class="prop-type">object</span> |  | Props applied to the Input element. It will be a [`FilledInput`](/api/filled-input/), [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/) component depending on the `variant` prop value. |
| <a class="anchor-link" id="props--inputProps"></a><a href="#props--inputProps" title="link to the prop on this page" class="prop-name">inputProps</a> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <a class="anchor-link" id="props--inputRef"></a><a href="#props--inputRef" title="link to the prop on this page" class="prop-name">inputRef</a> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <a class="anchor-link" id="props--label"></a><a href="#props--label" title="link to the prop on this page" class="prop-name">label</a> | <span class="prop-type">node</span> |  | The label content. |
| <a class="anchor-link" id="props--margin"></a><a href="#props--margin" title="link to the prop on this page" class="prop-name">margin</a> | <span class="prop-type">'none'<br>&#124;&nbsp;'dense'<br>&#124;&nbsp;'normal'</span> |  | If `dense` or `normal`, will adjust vertical spacing of this and contained components. |
| <a class="anchor-link" id="props--multiline"></a><a href="#props--multiline" title="link to the prop on this page" class="prop-name">multiline</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a textarea element will be rendered instead of an input. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" title="link to the prop on this page" class="prop-name">name</a> | <span class="prop-type">string</span> |  | Name attribute of the `input` element. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the value is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). |
| <a class="anchor-link" id="props--placeholder"></a><a href="#props--placeholder" title="link to the prop on this page" class="prop-name">placeholder</a> | <span class="prop-type">string</span> |  | The short hint displayed in the input before the user enters a value. |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" title="link to the prop on this page" class="prop-name">required</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label is displayed as required and the `input` element` will be required. |
| <a class="anchor-link" id="props--rows"></a><a href="#props--rows" title="link to the prop on this page" class="prop-name">rows</a> | <span class="prop-type">string<br>&#124;&nbsp;number</span> |  | Number of rows to display when multiline option is set to true. |
| <a class="anchor-link" id="props--rowsMax"></a><a href="#props--rowsMax" title="link to the prop on this page" class="prop-name">rowsMax</a> | <span class="prop-type">string<br>&#124;&nbsp;number</span> |  | Maximum number of rows to display when multiline option is set to true. |
| <a class="anchor-link" id="props--select"></a><a href="#props--select" title="link to the prop on this page" class="prop-name">select</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Render a [`Select`](/api/select/) element while passing the Input element to `Select` as `input` parameter. If this option is set you must pass the options of the select as children. |
| <a class="anchor-link" id="props--SelectProps"></a><a href="#props--SelectProps" title="link to the prop on this page" class="prop-name">SelectProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`Select`](/api/select/) element. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" title="link to the prop on this page" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> |  | The size of the text field. |
| <a class="anchor-link" id="props--type"></a><a href="#props--type" title="link to the prop on this page" class="prop-name">type</a> | <span class="prop-type">string</span> |  | Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types). |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The value of the `input` element, required for a controlled component. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([FormControl](/api/form-control/)).

## CSS

- Style sheet name: `MuiTextField`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTextField-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TextField/TextField.js) for more detail.

## Inheritance

The props of the [FormControl](/api/form-control/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Autocomplete](/components/autocomplete/)
- [Pickers](/components/pickers/)
- [Text Fields](/components/text-fields/)

