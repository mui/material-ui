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
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'p'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should be displayed in a disabled state. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" title="link to the prop on this page" class="prop-name">error</a> | <span class="prop-type">bool</span> |  | If `true`, helper text should be displayed in an error state. |
| <a class="anchor-link" id="props--filled"></a><a href="#props--filled" title="link to the prop on this page" class="prop-name">filled</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use filled classes key. |
| <a class="anchor-link" id="props--focused"></a><a href="#props--focused" title="link to the prop on this page" class="prop-name">focused</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use focused classes key. |
| <a class="anchor-link" id="props--margin"></a><a href="#props--margin" title="link to the prop on this page" class="prop-name">margin</a> | <span class="prop-type">'dense'</span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" title="link to the prop on this page" class="prop-name">required</a> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use required classes key. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiFormHelperText`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiFormHelperText-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--error"></a><a href="#css--error" class="prop-name">error</a> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--marginDense"></a><a href="#css--marginDense" class="prop-name">marginDense</a> | <span class="prop-name">.MuiFormHelperText-marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--contained"></a><a href="#css--contained" class="prop-name">contained</a> | <span class="prop-name">.MuiFormHelperText-contained</span> | Styles applied to the root element if `variant="filled"` or `variant="outlined"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--focused"></a><a href="#css--focused" class="prop-name">focused</a> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--filled"></a><a href="#css--filled" class="prop-name">filled</a> | <span class="prop-name">.MuiFormHelperText-filled</span> | Pseudo-class applied to the root element if `filled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--required"></a><a href="#css--required" class="prop-name">required</a> | <span class="prop-name">.Mui-required</span> | Pseudo-class applied to the root element if `required={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormHelperText/FormHelperText.js) for more detail.

## Demos

- [Text Fields](/components/text-fields/)

