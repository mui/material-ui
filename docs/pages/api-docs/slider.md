---
filename: /packages/material-ui/src/Slider/Slider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slider API

<p class="description">The API documentation of the Slider React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Slider from '@material-ui/core/Slider';
// or
import { Slider } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSlider` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">aria-label</span> | <span class="prop-type">string</span> |  | The label of the slider. |
| <span class="prop-name">aria-labelledby</span> | <span class="prop-type">string</span> |  | The id of the element containing a label for the slider. |
| <span class="prop-name">aria-valuetext</span> | <span class="prop-type">string</span> |  | A string value that provides a user-friendly name for the current value of the slider. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">number<br>&#124;&nbsp;Array&lt;number&gt;</span> |  | The default element value. Use when the component is not controlled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be disabled. |
| <span class="prop-name">getAriaLabel</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.<br><br>**Signature:**<br>`function(index: number) => string`<br>*index:* The thumb label's index to format. |
| <span class="prop-name">getAriaValueText</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.<br><br>**Signature:**<br>`function(value: number, index: number) => string`<br>*value:* The thumb label's value to format.<br>*index:* The thumb label's index to format. |
| <span class="prop-name">marks</span> | <span class="prop-type">bool<br>&#124;&nbsp;array</span> | <span class="prop-default">false</span> | Marks indicate predetermined values to which the user can move the slider. If `true` the marks will be spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <span class="prop-name">min</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the hidden `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the slider's value changed.<br><br>**Signature:**<br>`function(event: object, value: number \| number[]) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <span class="prop-name">onChangeCommitted</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the `mouseup` is triggered.<br><br>**Signature:**<br>`function(event: object, value: number \| number[]) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <span class="prop-name">orientation</span> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The slider orientation. |
| <span class="prop-name">scale</span> | <span class="prop-type">func</span> | <span class="prop-default">(x) => x</span> | A transformation function, to change the scale of the slider. |
| <span class="prop-name">step</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step.<br>When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| <span class="prop-name">ThumbComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used to display the value label. |
| <span class="prop-name">track</span> | <span class="prop-type">'normal'<br>&#124;&nbsp;false<br>&#124;&nbsp;'inverted'</span> | <span class="prop-default">'normal'</span> | The track presentation:<br>- `normal` the track will render a bar representing the slider value. - `inverted` the track will render a bar representing the remaining slider value. - `false` the track will render without a bar. |
| <span class="prop-name">value</span> | <span class="prop-type">number<br>&#124;&nbsp;Array&lt;number&gt;</span> |  | The value of the slider. For ranged sliders, provide an array with two values. |
| <span class="prop-name">ValueLabelComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ValueLabel</span> | The value label component. |
| <span class="prop-name">valueLabelDisplay</span> | <span class="prop-type">'on'<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;'off'</span> | <span class="prop-default">'off'</span> | Controls when the value label is displayed:<br>- `auto` the value label will display when the thumb is hovered or focused. - `on` will display persistently. - `off` will never display. |
| <span class="prop-name">valueLabelFormat</span> | <span class="prop-type">string<br>&#124;&nbsp;func</span> | <span class="prop-default">(x) => x</span> | The format function the value label's value.<br>When a function is provided, it should have the following signature:<br>- {number} value The value label's value to format - {number} index The value label's index to format |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSlider-root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiSlider-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiSlider-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">marked</span> | <span class="prop-name">.MuiSlider-marked</span> | Styles applied to the root element if `marks` is provided with at least one label.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiSlider-vertical</span> | Pseudo-class applied to the root element if `orientation="vertical"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root and thumb element if `disabled={true}`.
| <span class="prop-name">rail</span> | <span class="prop-name">.MuiSlider-rail</span> | Styles applied to the rail element.
| <span class="prop-name">track</span> | <span class="prop-name">.MuiSlider-track</span> | Styles applied to the track element.
| <span class="prop-name">trackFalse</span> | <span class="prop-name">.MuiSlider-trackFalse</span> | Styles applied to the track element if `track={false}`.
| <span class="prop-name">trackInverted</span> | <span class="prop-name">.MuiSlider-trackInverted</span> | Styles applied to the track element if `track="inverted"`.
| <span class="prop-name">thumb</span> | <span class="prop-name">.MuiSlider-thumb</span> | Styles applied to the thumb element.
| <span class="prop-name">thumbColorPrimary</span> | <span class="prop-name">.MuiSlider-thumbColorPrimary</span> | Styles applied to the thumb element if `color="primary"`.
| <span class="prop-name">thumbColorSecondary</span> | <span class="prop-name">.MuiSlider-thumbColorSecondary</span> | Styles applied to the thumb element if `color="secondary"`.
| <span class="prop-name">active</span> | <span class="prop-name">.MuiSlider-active</span> | Pseudo-class applied to the thumb element if it's active.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the thumb element if keyboard focused.
| <span class="prop-name">valueLabel</span> | <span class="prop-name">.MuiSlider-valueLabel</span> | Styles applied to the thumb label element.
| <span class="prop-name">mark</span> | <span class="prop-name">.MuiSlider-mark</span> | Styles applied to the mark element.
| <span class="prop-name">markActive</span> | <span class="prop-name">.MuiSlider-markActive</span> | Styles applied to the mark element if active (depending on the value).
| <span class="prop-name">markLabel</span> | <span class="prop-name">.MuiSlider-markLabel</span> | Styles applied to the mark label element.
| <span class="prop-name">markLabelActive</span> | <span class="prop-name">.MuiSlider-markLabelActive</span> | Styles applied to the mark label element if active (depending on the value).

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Slider/Slider.js) for more detail.

## Demos

- [Slider](/components/slider/)

