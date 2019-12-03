---
filename: /packages/material-ui/src/InputLabel/InputLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputLabel API

<p class="description">The API documentation of the InputLabel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import InputLabel from '@material-ui/core/InputLabel';
// or
import { InputLabel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The contents of the `InputLabel`. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> |  | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--disableAnimation"></a><a href="#props--disableAnimation" class="prop-name">disableAnimation</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the transition animation is disabled. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> |  | If `true`, apply disabled class. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> |  | If `true`, the label will be displayed in an error state. |
| <a class="anchor-link" id="props--focused"></a><a href="#props--focused" class="prop-name">focused</a> | <span class="prop-type">bool</span> |  | If `true`, the input of this label is focused. |
| <a class="anchor-link" id="props--margin"></a><a href="#props--margin" class="prop-name">margin</a> | <span class="prop-type">'dense'</span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" class="prop-name">required</a> | <span class="prop-type">bool</span> |  | if `true`, the label will indicate that the input is required. |
| <a class="anchor-link" id="props--shrink"></a><a href="#props--shrink" class="prop-name">shrink</a> | <span class="prop-type">bool</span> |  | If `true`, the label is shrunk. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([FormLabel](/api/form-label/)).

## CSS

- Style sheet name: `MuiInputLabel`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiInputLabel-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--focused"></a><a href="#css--focused" class="prop-name">focused</a> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--error"></a><a href="#css--error" class="prop-name">error</a> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <a class="anchor-link" id="css--required"></a><a href="#css--required" class="prop-name">required</a> | <span class="prop-name">.Mui-required</span> | Pseudo-class applied to the root element if `required={true}`.
| <a class="anchor-link" id="css--asterisk"></a><a href="#css--asterisk" class="prop-name">asterisk</a> | <span class="prop-name">.MuiInputLabel-asterisk</span> | Pseudo-class applied to the asterisk element.
| <a class="anchor-link" id="css--formControl"></a><a href="#css--formControl" class="prop-name">formControl</a> | <span class="prop-name">.MuiInputLabel-formControl</span> | Styles applied to the root element if the component is a descendant of `FormControl`.
| <a class="anchor-link" id="css--marginDense"></a><a href="#css--marginDense" class="prop-name">marginDense</a> | <span class="prop-name">.MuiInputLabel-marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <a class="anchor-link" id="css--shrink"></a><a href="#css--shrink" class="prop-name">shrink</a> | <span class="prop-name">.MuiInputLabel-shrink</span> | Styles applied to the `input` element if `shrink={true}`.
| <a class="anchor-link" id="css--animated"></a><a href="#css--animated" class="prop-name">animated</a> | <span class="prop-name">.MuiInputLabel-animated</span> | Styles applied to the `input` element if `disableAnimation={false}`.
| <a class="anchor-link" id="css--filled"></a><a href="#css--filled" class="prop-name">filled</a> | <span class="prop-name">.MuiInputLabel-filled</span> | Styles applied to the root element if `variant="filled"`.
| <a class="anchor-link" id="css--outlined"></a><a href="#css--outlined" class="prop-name">outlined</a> | <span class="prop-name">.MuiInputLabel-outlined</span> | Styles applied to the root element if `variant="outlined"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/InputLabel/InputLabel.js) for more detail.

## Inheritance

The props of the [FormLabel](/api/form-label/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Text Fields](/components/text-fields/)

