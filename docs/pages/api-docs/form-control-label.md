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

## Component name

The `MuiFormControlLabel` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">checked</span> | <span class="prop-type">bool</span> |  | If `true`, the component appears selected. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name required">control<abbr title="required">*</abbr></span> | <span class="prop-type">element</span> |  | A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the control will be disabled. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The text to be used in an enclosing label element. |
| <span class="prop-name">labelPlacement</span> | <span class="prop-type">'bottom'<br>&#124;&nbsp;'end'<br>&#124;&nbsp;'start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'end'</span> | The position of the label. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new checked state by accessing `event.target.checked` (boolean). |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiFormControlLabel-root</span> | Styles applied to the root element.
| <span class="prop-name">labelPlacementStart</span> | <span class="prop-name">.MuiFormControlLabel-labelPlacementStart</span> | Styles applied to the root element if `labelPlacement="start"`.
| <span class="prop-name">labelPlacementTop</span> | <span class="prop-name">.MuiFormControlLabel-labelPlacementTop</span> | Styles applied to the root element if `labelPlacement="top"`.
| <span class="prop-name">labelPlacementBottom</span> | <span class="prop-name">.MuiFormControlLabel-labelPlacementBottom</span> | Styles applied to the root element if `labelPlacement="bottom"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiFormControlLabel-label</span> | Styles applied to the label's Typography component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormControlLabel/FormControlLabel.js) for more detail.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)

