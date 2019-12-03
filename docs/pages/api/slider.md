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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--aria-label"></a><a href="#props--aria-label" class="prop-name">aria-label</a> | <span class="prop-type">string</span> |  | The label of the slider. |
| <a class="anchor-link" id="props--aria-labelledby"></a><a href="#props--aria-labelledby" class="prop-name">aria-labelledby</a> | <span class="prop-type">string</span> |  | The id of the element containing a label for the slider. |
| <a class="anchor-link" id="props--aria-valuetext"></a><a href="#props--aria-valuetext" class="prop-name">aria-valuetext</a> | <span class="prop-type">string</span> |  | A string value that provides a user-friendly name for the current value of the slider. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--defaultValue"></a><a href="#props--defaultValue" class="prop-name">defaultValue</a> | <span class="prop-type">number<br>&#124;&nbsp;Array&lt;number&gt;</span> |  | The default element value. Use when the component is not controlled. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be disabled. |
| <a class="anchor-link" id="props--getAriaLabel"></a><a href="#props--getAriaLabel" class="prop-name">getAriaLabel</a> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.<br><br>**Signature:**<br>`function(index: number) => string`<br>*index:* The thumb label's index to format. |
| <a class="anchor-link" id="props--getAriaValueText"></a><a href="#props--getAriaValueText" class="prop-name">getAriaValueText</a> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.<br><br>**Signature:**<br>`function(value: number, index: number) => string`<br>*value:* The thumb label's value to format.<br>*index:* The thumb label's index to format. |
| <a class="anchor-link" id="props--marks"></a><a href="#props--marks" class="prop-name">marks</a> | <span class="prop-type">bool<br>&#124;&nbsp;array</span> | <span class="prop-default">[]</span> | Marks indicate predetermined values to which the user can move the slider. If `true` the marks will be spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys. |
| <a class="anchor-link" id="props--max"></a><a href="#props--max" class="prop-name">max</a> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <a class="anchor-link" id="props--min"></a><a href="#props--min" class="prop-name">min</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" class="prop-name">name</a> | <span class="prop-type">string</span> |  | Name attribute of the hidden `input` element. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback function that is fired when the slider's value changed.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <a class="anchor-link" id="props--onChangeCommitted"></a><a href="#props--onChangeCommitted" class="prop-name">onChangeCommitted</a> | <span class="prop-type">func</span> |  | Callback function that is fired when the `mouseup` is triggered.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <a class="anchor-link" id="props--orientation"></a><a href="#props--orientation" class="prop-name">orientation</a> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The slider orientation. |
| <a class="anchor-link" id="props--step"></a><a href="#props--step" class="prop-name">step</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step.<br>When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| <a class="anchor-link" id="props--ThumbComponent"></a><a href="#props--ThumbComponent" class="prop-name">ThumbComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used to display the value label. |
| <a class="anchor-link" id="props--track"></a><a href="#props--track" class="prop-name">track</a> | <span class="prop-type">'normal'<br>&#124;&nbsp;false<br>&#124;&nbsp;'inverted'</span> | <span class="prop-default">'normal'</span> | The track presentation:<br>- `normal` the track will render a bar representing the slider value. - `inverted` the track will render a bar representing the remaining slider value. - `false` the track will render without a bar. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" class="prop-name">value</a> | <span class="prop-type">number<br>&#124;&nbsp;Array&lt;number&gt;</span> |  | The value of the slider. For ranged sliders, provide an array with two values. |
| <a class="anchor-link" id="props--ValueLabelComponent"></a><a href="#props--ValueLabelComponent" class="prop-name">ValueLabelComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">ValueLabel</span> | The value label component. |
| <a class="anchor-link" id="props--valueLabelDisplay"></a><a href="#props--valueLabelDisplay" class="prop-name">valueLabelDisplay</a> | <span class="prop-type">'on'<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;'off'</span> | <span class="prop-default">'off'</span> | Controls when the value label is displayed:<br>- `auto` the value label will display when the thumb is hovered or focused. - `on` will display persistently. - `off` will never display. |
| <a class="anchor-link" id="props--valueLabelFormat"></a><a href="#props--valueLabelFormat" class="prop-name">valueLabelFormat</a> | <span class="prop-type">string<br>&#124;&nbsp;func</span> | <span class="prop-default">x => x</span> | The format function the value label's value.<br>When a function is provided, it should have the following signature:<br>- {number} value The value label's value to format - {number} index The value label's index to format |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSlider`.
- Style sheet details:

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

