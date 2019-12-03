---
filename: /packages/material-ui/src/OutlinedInput/OutlinedInput.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# OutlinedInput API

<p class="description">The API documentation of the OutlinedInput React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import OutlinedInput from '@material-ui/core/OutlinedInput';
// or
import { OutlinedInput } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--autoComplete"></a><a href="#props--autoComplete" class="prop-name">autoComplete</a> | <span class="prop-type">string</span> |  | This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill). |
| <a class="anchor-link" id="props--autoFocus"></a><a href="#props--autoFocus" class="prop-name">autoFocus</a> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be focused during the first mount. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--className"></a><a href="#props--className" class="prop-name">className</a> | <span class="prop-type">string</span> |  | The CSS class name of the wrapper element. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> |  | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--defaultValue"></a><a href="#props--defaultValue" class="prop-name">defaultValue</a> | <span class="prop-type">any</span> |  | The default `input` element value. Use when the component is not controlled. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be disabled. |
| <a class="anchor-link" id="props--endAdornment"></a><a href="#props--endAdornment" class="prop-name">endAdornment</a> | <span class="prop-type">node</span> |  | End `InputAdornment` for this component. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> |  | If `true`, the input will indicate an error. This is normally obtained via context from FormControl. |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will take up the full width of its container. |
| <a class="anchor-link" id="props--id"></a><a href="#props--id" class="prop-name">id</a> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <a class="anchor-link" id="props--inputComponent"></a><a href="#props--inputComponent" class="prop-name">inputComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'input'</span> | The component used for the native input. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--inputProps"></a><a href="#props--inputProps" class="prop-name">inputProps</a> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <a class="anchor-link" id="props--inputRef"></a><a href="#props--inputRef" class="prop-name">inputRef</a> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <a class="anchor-link" id="props--labelWidth"></a><a href="#props--labelWidth" class="prop-name">labelWidth</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The width of the label. |
| <a class="anchor-link" id="props--margin"></a><a href="#props--margin" class="prop-name">margin</a> | <span class="prop-type">'dense'<br>&#124;&nbsp;'none'</span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <a class="anchor-link" id="props--multiline"></a><a href="#props--multiline" class="prop-name">multiline</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a textarea element will be rendered. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" class="prop-name">name</a> | <span class="prop-type">string</span> |  | Name attribute of the `input` element. |
| <a class="anchor-link" id="props--notched"></a><a href="#props--notched" class="prop-name">notched</a> | <span class="prop-type">bool</span> |  | If `true`, the outline is notched to accommodate the label. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the value is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). |
| <a class="anchor-link" id="props--placeholder"></a><a href="#props--placeholder" class="prop-name">placeholder</a> | <span class="prop-type">string</span> |  | The short hint displayed in the input before the user enters a value. |
| <a class="anchor-link" id="props--readOnly"></a><a href="#props--readOnly" class="prop-name">readOnly</a> | <span class="prop-type">bool</span> |  | It prevents the user from changing the value of the field (not from interacting with the field). |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" class="prop-name">required</a> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be required. |
| <a class="anchor-link" id="props--rows"></a><a href="#props--rows" class="prop-name">rows</a> | <span class="prop-type">string<br>&#124;&nbsp;number</span> |  | Number of rows to display when multiline option is set to true. |
| <a class="anchor-link" id="props--rowsMax"></a><a href="#props--rowsMax" class="prop-name">rowsMax</a> | <span class="prop-type">string<br>&#124;&nbsp;number</span> |  | Maximum number of rows to display when multiline option is set to true. |
| <a class="anchor-link" id="props--startAdornment"></a><a href="#props--startAdornment" class="prop-name">startAdornment</a> | <span class="prop-type">node</span> |  | Start `InputAdornment` for this component. |
| <a class="anchor-link" id="props--type"></a><a href="#props--type" class="prop-name">type</a> | <span class="prop-type">string</span> | <span class="prop-default">'text'</span> | Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types). |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The value of the `input` element, required for a controlled component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([InputBase](/api/input-base/)).

## CSS

- Style sheet name: `MuiOutlinedInput`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiOutlinedInput-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiOutlinedInput-colorSecondary</span> | Styles applied to the root element if the color is secondary.
| <a class="anchor-link" id="css--focused"></a><a href="#css--focused" class="prop-name">focused</a> | <span class="prop-name">.Mui-focused</span> | Styles applied to the root element if the component is focused.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Styles applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--adornedStart"></a><a href="#css--adornedStart" class="prop-name">adornedStart</a> | <span class="prop-name">.MuiOutlinedInput-adornedStart</span> | Styles applied to the root element if `startAdornment` is provided.
| <a class="anchor-link" id="css--adornedEnd"></a><a href="#css--adornedEnd" class="prop-name">adornedEnd</a> | <span class="prop-name">.MuiOutlinedInput-adornedEnd</span> | Styles applied to the root element if `endAdornment` is provided.
| <a class="anchor-link" id="css--error"></a><a href="#css--error" class="prop-name">error</a> | <span class="prop-name">.Mui-error</span> | Styles applied to the root element if `error={true}`.
| <a class="anchor-link" id="css--marginDense"></a><a href="#css--marginDense" class="prop-name">marginDense</a> | <span class="prop-name">.MuiOutlinedInput-marginDense</span> | Styles applied to the `input` element if `margin="dense"`.
| <a class="anchor-link" id="css--multiline"></a><a href="#css--multiline" class="prop-name">multiline</a> | <span class="prop-name">.MuiOutlinedInput-multiline</span> | Styles applied to the root element if `multiline={true}`.
| <a class="anchor-link" id="css--notchedOutline"></a><a href="#css--notchedOutline" class="prop-name">notchedOutline</a> | <span class="prop-name">.MuiOutlinedInput-notchedOutline</span> | Styles applied to the `NotchedOutline` element.
| <a class="anchor-link" id="css--input"></a><a href="#css--input" class="prop-name">input</a> | <span class="prop-name">.MuiOutlinedInput-input</span> | Styles applied to the `input` element.
| <a class="anchor-link" id="css--inputMarginDense"></a><a href="#css--inputMarginDense" class="prop-name">inputMarginDense</a> | <span class="prop-name">.MuiOutlinedInput-inputMarginDense</span> | Styles applied to the `input` element if `margin="dense"`.
| <a class="anchor-link" id="css--inputMultiline"></a><a href="#css--inputMultiline" class="prop-name">inputMultiline</a> | <span class="prop-name">.MuiOutlinedInput-inputMultiline</span> | Styles applied to the `input` element if `multiline={true}`.
| <a class="anchor-link" id="css--inputAdornedStart"></a><a href="#css--inputAdornedStart" class="prop-name">inputAdornedStart</a> | <span class="prop-name">.MuiOutlinedInput-inputAdornedStart</span> | Styles applied to the `input` element if `startAdornment` is provided.
| <a class="anchor-link" id="css--inputAdornedEnd"></a><a href="#css--inputAdornedEnd" class="prop-name">inputAdornedEnd</a> | <span class="prop-name">.MuiOutlinedInput-inputAdornedEnd</span> | Styles applied to the `input` element if `endAdornment` is provided.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/OutlinedInput/OutlinedInput.js) for more detail.

## Inheritance

The props of the [InputBase](/api/input-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Text Fields](/components/text-fields/)

