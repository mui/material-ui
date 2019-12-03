---
filename: /packages/material-ui/src/FormHelperText/FormHelperText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormHelperText API

<p class="description">The API documentation of the FormHelperText React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormHelperText from '@material-ui/core/FormHelperText';
// or
import { FormHelperText } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'p'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should be displayed in a disabled state. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> |  | If `true`, helper text should be displayed in an error state. |
| <a class="anchor-link" id="props--filled"></a><a href="#props--filled" class="prop-name">filled</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use filled classes key. |
| <a class="anchor-link" id="props--focused"></a><a href="#props--focused" class="prop-name">focused</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use focused classes key. |
| <a class="anchor-link" id="props--margin"></a><a href="#props--margin" class="prop-name">margin</a> | <span class="prop-type">'dense'</span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" class="prop-name">required</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use required classes key. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiFormHelperText`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiFormHelperText-root</span> | Styles applied to the root element.
| <span class="prop-name">error</span> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">marginDense</span> | <span class="prop-name">.MuiFormHelperText-marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">contained</span> | <span class="prop-name">.MuiFormHelperText-contained</span> | Styles applied to the root element if `variant="filled"` or `variant="outlined"`.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <span class="prop-name">filled</span> | <span class="prop-name">.MuiFormHelperText-filled</span> | Pseudo-class applied to the root element if `filled={true}`.
| <span class="prop-name">required</span> | <span class="prop-name">.Mui-required</span> | Pseudo-class applied to the root element if `required={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormHelperText/FormHelperText.js) for more detail.

## Demos

- [Text Fields](/components/text-fields/)

