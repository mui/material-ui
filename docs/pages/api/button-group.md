---
filename: /packages/material-ui/src/ButtonGroup/ButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonGroup API

<p class="description">The API documentation of the ButtonGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ButtonGroup from '@material-ui/core/ButtonGroup';
// or
import { ButtonGroup } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the button group. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the buttons will be disabled. |
| <a class="anchor-link" id="props--disableFocusRipple"></a><a href="#props--disableFocusRipple" title="link to the prop on this page" class="prop-name">disableFocusRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" title="link to the prop on this page" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button ripple effect will be disabled. |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" title="link to the prop on this page" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the buttons will take up the full width of its container. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" title="link to the prop on this page" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'contained'</span> | <span class="prop-default">'outlined'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiButtonGroup`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiButtonGroup-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--contained"></a><a href="#css--contained" class="prop-name">contained</a> | <span class="prop-name">.MuiButtonGroup-contained</span> | Styles applied to the root element if `variant="contained"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--fullWidth"></a><a href="#css--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-name">.MuiButtonGroup-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--grouped"></a><a href="#css--grouped" class="prop-name">grouped</a> | <span class="prop-name">.MuiButtonGroup-grouped</span> | Styles applied to the children.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedText"></a><a href="#css--groupedText" class="prop-name">groupedText</a> | <span class="prop-name">.MuiButtonGroup-groupedText</span> | Styles applied to the children if `variant="text"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedTextPrimary"></a><a href="#css--groupedTextPrimary" class="prop-name">groupedTextPrimary</a> | <span class="prop-name">.MuiButtonGroup-groupedTextPrimary</span> | Styles applied to the children if `variant="text"` and `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedTextSecondary"></a><a href="#css--groupedTextSecondary" class="prop-name">groupedTextSecondary</a> | <span class="prop-name">.MuiButtonGroup-groupedTextSecondary</span> | Styles applied to the children if `variant="text"` and `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedOutlined"></a><a href="#css--groupedOutlined" class="prop-name">groupedOutlined</a> | <span class="prop-name">.MuiButtonGroup-groupedOutlined</span> | Styles applied to the children if `variant="outlined"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedOutlinedPrimary"></a><a href="#css--groupedOutlinedPrimary" class="prop-name">groupedOutlinedPrimary</a> | <span class="prop-name">.MuiButtonGroup-groupedOutlinedPrimary</span> | Styles applied to the children if `variant="outlined"` and `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedOutlinedSecondary"></a><a href="#css--groupedOutlinedSecondary" class="prop-name">groupedOutlinedSecondary</a> | <span class="prop-name">.MuiButtonGroup-groupedOutlinedSecondary</span> | Styles applied to the children if `variant="outlined"` and `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedContained"></a><a href="#css--groupedContained" class="prop-name">groupedContained</a> | <span class="prop-name">.MuiButtonGroup-groupedContained</span> | Styles applied to the children if `variant="contained"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedContainedPrimary"></a><a href="#css--groupedContainedPrimary" class="prop-name">groupedContainedPrimary</a> | <span class="prop-name">.MuiButtonGroup-groupedContainedPrimary</span> | Styles applied to the children if `variant="contained"` and `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--groupedContainedSecondary"></a><a href="#css--groupedContainedSecondary" class="prop-name">groupedContainedSecondary</a> | <span class="prop-name">.MuiButtonGroup-groupedContainedSecondary</span> | Styles applied to the children if `variant="contained"` and `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to child elements if `disabled={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonGroup/ButtonGroup.js) for more detail.

## Demos

- [Buttons](/components/buttons/)

