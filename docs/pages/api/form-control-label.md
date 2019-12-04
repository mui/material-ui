---
filename: /packages/material-ui/src/FormControlLabel/FormControlLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControlLabel API

<p class="description">The API documentation of the FormControlLabel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormControlLabel from '@material-ui/core/FormControlLabel';
// or
import { FormControlLabel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
Use this component if you want to display an extra label.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--checked"></a><a href="#props--checked" title="link to the prop on this page" class="prop-name">checked</a> | <span class="prop-type">bool</span> |  | If `true`, the component appears selected. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--control"></a><a href="#props--control" title="link to the prop on this page" class="prop-name">control</a> | <span class="prop-type">element</span> |  | A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> |  | If `true`, the control will be disabled. |
| <a class="anchor-link" id="props--inputRef"></a><a href="#props--inputRef" title="link to the prop on this page" class="prop-name">inputRef</a> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <a class="anchor-link" id="props--label"></a><a href="#props--label" title="link to the prop on this page" class="prop-name">label</a> | <span class="prop-type">node</span> |  | The text to be used in an enclosing label element. |
| <a class="anchor-link" id="props--labelPlacement"></a><a href="#props--labelPlacement" title="link to the prop on this page" class="prop-name">labelPlacement</a> | <span class="prop-type">'end'<br>&#124;&nbsp;'start'<br>&#124;&nbsp;'top'<br>&#124;&nbsp;'bottom'</span> | <span class="prop-default">'end'</span> | The position of the label. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" title="link to the prop on this page" class="prop-name">name</a> | <span class="prop-type">string</span> |  |  |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new checked state by accessing `event.target.checked` (boolean). |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The value of the component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiFormControlLabel`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiFormControlLabel-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--labelPlacementStart"></a><a href="#css--labelPlacementStart" class="prop-name">labelPlacementStart</a> | <span class="prop-name">.MuiFormControlLabel-labelPlacementStart</span> | Styles applied to the root element if `labelPlacement="start"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--labelPlacementTop"></a><a href="#css--labelPlacementTop" class="prop-name">labelPlacementTop</a> | <span class="prop-name">.MuiFormControlLabel-labelPlacementTop</span> | Styles applied to the root element if `labelPlacement="top"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--labelPlacementBottom"></a><a href="#css--labelPlacementBottom" class="prop-name">labelPlacementBottom</a> | <span class="prop-name">.MuiFormControlLabel-labelPlacementBottom</span> | Styles applied to the root element if `labelPlacement="bottom"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiFormControlLabel-label</span> | Styles applied to the label's Typography component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormControlLabel/FormControlLabel.js) for more detail.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)

