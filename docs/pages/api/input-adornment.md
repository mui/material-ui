---
filename: /packages/material-ui/src/InputAdornment/InputAdornment.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputAdornment API

<p class="description">The API documentation of the InputAdornment React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import InputAdornment from '@material-ui/core/InputAdornment';
// or
import { InputAdornment } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the component, normally an `IconButton` or string. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disablePointerEvents"></a><a href="#props--disablePointerEvents" title="link to the prop on this page" class="prop-name">disablePointerEvents</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable pointer events on the root. This allows for the content of the adornment to focus the input on click. |
| <a class="anchor-link" id="props--disableTypography"></a><a href="#props--disableTypography" title="link to the prop on this page" class="prop-name">disableTypography</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If children is a string then disable wrapping in a Typography component. |
| <a class="anchor-link" id="props--position"></a><a href="#props--position" title="link to the prop on this page" class="prop-name">position</a> | <span class="prop-type">'start'<br>&#124;&nbsp;'end'</span> |  | The position this adornment should appear relative to the `Input`. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> |  | The variant to use. Note: If you are using the `TextField` component or the `FormControl` component you do not have to set this manually. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiInputAdornment`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiInputAdornment-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--filled"></a><a href="#css--filled" class="prop-name">filled</a> | <span class="prop-name">.MuiInputAdornment-filled</span> | Styles applied to the root element if `variant="filled"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--positionStart"></a><a href="#css--positionStart" class="prop-name">positionStart</a> | <span class="prop-name">.MuiInputAdornment-positionStart</span> | Styles applied to the root element if `position="start"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--positionEnd"></a><a href="#css--positionEnd" class="prop-name">positionEnd</a> | <span class="prop-name">.MuiInputAdornment-positionEnd</span> | Styles applied to the root element if `position="end"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disablePointerEvents"></a><a href="#css--disablePointerEvents" class="prop-name">disablePointerEvents</a> | <span class="prop-name">.MuiInputAdornment-disablePointerEvents</span> | Styles applied to the root element if `disablePointerEvents=true`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--hiddenLabel"></a><a href="#css--hiddenLabel" class="prop-name">hiddenLabel</a> | <span class="prop-name">.MuiInputAdornment-hiddenLabel</span> | Styles applied if the adornment is used inside &lt;FormControl hiddenLabel />.
| <a class="anchor-link" title="link to the rule name on this page" id="css--marginDense"></a><a href="#css--marginDense" class="prop-name">marginDense</a> | <span class="prop-name">.MuiInputAdornment-marginDense</span> | Styles applied if the adornment is used inside &lt;FormControl margin="dense" />.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/InputAdornment/InputAdornment.js) for more detail.

## Demos

- [Text Fields](/components/text-fields/)

