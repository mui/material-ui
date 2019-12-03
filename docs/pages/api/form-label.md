---
filename: /packages/material-ui/src/FormLabel/FormLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormLabel API

<p class="description">The API documentation of the FormLabel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormLabel from '@material-ui/core/FormLabel';
// or
import { FormLabel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> |  | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'label'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> |  | If `true`, the label should be displayed in a disabled state. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> |  | If `true`, the label should be displayed in an error state. |
| <a class="anchor-link" id="props--filled"></a><a href="#props--filled" class="prop-name">filled</a> | <span class="prop-type">bool</span> |  | If `true`, the label should use filled classes key. |
| <a class="anchor-link" id="props--focused"></a><a href="#props--focused" class="prop-name">focused</a> | <span class="prop-type">bool</span> |  | If `true`, the input of this label is focused (used by `FormGroup` components). |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" class="prop-name">required</a> | <span class="prop-type">bool</span> |  | If `true`, the label will indicate that the input is required. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiFormLabel`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiFormLabel-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiFormLabel-colorSecondary</span> | Styles applied to the root element if the color is secondary.
| <a class="anchor-link" id="css--focused"></a><a href="#css--focused" class="prop-name">focused</a> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--error"></a><a href="#css--error" class="prop-name">error</a> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <a class="anchor-link" id="css--filled"></a><a href="#css--filled" class="prop-name">filled</a> | <span class="prop-name">.MuiFormLabel-filled</span> | Pseudo-class applied to the root element if `filled={true}`.
| <a class="anchor-link" id="css--required"></a><a href="#css--required" class="prop-name">required</a> | <span class="prop-name">.Mui-required</span> | Pseudo-class applied to the root element if `required={true}`.
| <a class="anchor-link" id="css--asterisk"></a><a href="#css--asterisk" class="prop-name">asterisk</a> | <span class="prop-name">.MuiFormLabel-asterisk</span> | Styles applied to the asterisk element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormLabel/FormLabel.js) for more detail.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)

