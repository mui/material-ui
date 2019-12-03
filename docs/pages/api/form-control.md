---
filename: /packages/material-ui/src/FormControl/FormControl.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControl API

<p class="description">The API documentation of the FormControl React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormControl from '@material-ui/core/FormControl';
// or
import { FormControl } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Provides context such as filled/focused/error/required for form inputs.
Relying on the context provides high flexibility and ensures that the state always stays
consistent across the children of the `FormControl`.
This context is used by the following components:

 - FormLabel
 - FormHelperText
 - Input
 - InputLabel

You can find one composition example below and more going to [the demos](/components/text-fields/#components).

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

⚠️Only one input can be used within a FormControl.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The contents of the form control. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label, input and helper text should be displayed in a disabled state. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label should be displayed in an error state. |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will take up the full width of its container. |
| <a class="anchor-link" id="props--hiddenLabel"></a><a href="#props--hiddenLabel" class="prop-name">hiddenLabel</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will be hidden. This is used to increase density for a `FilledInput`. Be sure to add `aria-label` to the `input` element. |
| <a class="anchor-link" id="props--margin"></a><a href="#props--margin" class="prop-name">margin</a> | <span class="prop-type">'none'<br>&#124;&nbsp;'dense'<br>&#124;&nbsp;'normal'</span> | <span class="prop-default">'none'</span> | If `dense` or `normal`, will adjust vertical spacing of this and contained components. |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" class="prop-name">required</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will indicate that the input is required. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> |  | The size of the text field. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiFormControl`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiFormControl-root</span> | Styles applied to the root element.
| <span class="prop-name">marginNormal</span> | <span class="prop-name">.MuiFormControl-marginNormal</span> | Styles applied to the root element if `margin="normal"`.
| <span class="prop-name">marginDense</span> | <span class="prop-name">.MuiFormControl-marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">fullWidth</span> | <span class="prop-name">.MuiFormControl-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormControl/FormControl.js) for more detail.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)
- [Text Fields](/components/text-fields/)

