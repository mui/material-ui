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
| <a class="anchor-link" id="props--aria-label"></a><a href="#props--aria-label" title="link to the prop on this page" class="prop-name">aria-label</a> | <span class="prop-type">string</span> |  | The label of the slider. |
| <a class="anchor-link" id="props--aria-labelledby"></a><a href="#props--aria-labelledby" title="link to the prop on this page" class="prop-name">aria-labelledby</a> | <span class="prop-type">string</span> |  | The id of the element containing a label for the slider. |
| <a class="anchor-link" id="props--aria-valuetext"></a><a href="#props--aria-valuetext" title="link to the prop on this page" class="prop-name">aria-valuetext</a> | <span class="prop-type">string</span> |  | A string value that provides a user-friendly name for the current value of the slider. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--defaultValue"></a><a href="#props--defaultValue" title="link to the prop on this page" class="prop-name">defaultValue</a> | <span class="prop-type">number<br>&#124;&nbsp;Array&lt;number&gt;</span> |  | The default element value. Use when the component is not controlled. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be disabled. |
| <a class="anchor-link" id="props--getAriaLabel"></a><a href="#props--getAriaLabel" title="link to the prop on this page" class="prop-name">getAriaLabel</a> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.<br><br>**Signature:**<br>`function(index: number) => string`<br>*index:* The thumb label's index to format. |
| <a class="anchor-link" id="props--getAriaValueText"></a><a href="#props--getAriaValueText" title="link to the prop on this page" class="prop-name">getAriaValueText</a> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.<br><br>**Signature:**<br>`function(value: number, index: number) => string`<br>*value:* The thumb label's value to format.<br>*index:* The thumb label's index to format. |
| <a class="anchor-link" id="props--marks"></a><a href="#props--marks" title="link to the prop on this page" class="prop-name">marks</a> | <span class="prop-type">bool<br>&#124;&nbsp;array</span> | <span class="prop-default">[]</span> | Marks indicate predetermined values to which the user can move the slider. If `true` the marks will be spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys. |
| <a class="anchor-link" id="props--max"></a><a href="#props--max" title="link to the prop on this page" class="prop-name">max</a> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <a class="anchor-link" id="props--min"></a><a href="#props--min" title="link to the prop on this page" class="prop-name">min</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" title="link to the prop on this page" class="prop-name">name</a> | <span class="prop-type">string</span> |  | Name attribute of the hidden `input` element. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback function that is fired when the slider's value changed.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <a class="anchor-link" id="props--onChangeCommitted"></a><a href="#props--onChangeCommitted" title="link to the prop on this page" class="prop-name">onChangeCommitted</a> | <span class="prop-type">func</span> |  | Callback function that is fired when the `mouseup` is triggered.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <a class="anchor-link" id="props--orientation"></a><a href="#props--orientation" title="link to the prop on this page" class="prop-name">orientation</a> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The slider orientation. |
| <a class="anchor-link" id="props--step"></a><a href="#props--step" title="link to the prop on this page" class="prop-name">step</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step.<br>When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| <a class="anchor-link" id="props--ThumbComponent"></a><a href="#props--ThumbComponent" title="link to the prop on this page" class="prop-name">ThumbComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used to display the value label. |
| <a class="anchor-link" id="props--track"></a><a href="#props--track" title="link to the prop on this page" class="prop-name">track</a> | <span class="prop-type">'normal'<br>&#124;&nbsp;false<br>&#124;&nbsp;'inverted'</span> | <span class="prop-default">'normal'</span> | The track presentation:<br>- `normal` the track will render a bar representing the slider value. - `inverted` the track will render a bar representing the remaining slider value. - `false` the track will render without a bar. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">number<br>&#124;&nbsp;Array&lt;number&gt;</span> |  | The value of the slider. For ranged sliders, provide an array with two values. |
| <a class="anchor-link" id="props--ValueLabelComponent"></a><a href="#props--ValueLabelComponent" title="link to the prop on this page" class="prop-name">ValueLabelComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">ValueLabel</span> | The value label component. |
| <a class="anchor-link" id="props--valueLabelDisplay"></a><a href="#props--valueLabelDisplay" title="link to the prop on this page" class="prop-name">valueLabelDisplay</a> | <span class="prop-type">'on'<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;'off'</span> | <span class="prop-default">'off'</span> | Controls when the value label is displayed:<br>- `auto` the value label will display when the thumb is hovered or focused. - `on` will display persistently. - `off` will never display. |
| <a class="anchor-link" id="props--valueLabelFormat"></a><a href="#props--valueLabelFormat" title="link to the prop on this page" class="prop-name">valueLabelFormat</a> | <span class="prop-type">string<br>&#124;&nbsp;func</span> | <span class="prop-default">x => x</span> | The format function the value label's value.<br>When a function is provided, it should have the following signature:<br>- {number} value The value label's value to format - {number} index The value label's index to format |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSlider`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSlider-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiSlider-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiSlider-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--marked"></a><a href="#css--marked" class="prop-name">marked</a> | <span class="prop-name">.MuiSlider-marked</span> | Styles applied to the root element if `marks` is provided with at least one label.
| <a class="anchor-link" title="link to the rule name on this page" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiSlider-vertical</span> | Pseudo-class applied to the root element if `orientation="vertical"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root and thumb element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--rail"></a><a href="#css--rail" class="prop-name">rail</a> | <span class="prop-name">.MuiSlider-rail</span> | Styles applied to the rail element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--track"></a><a href="#css--track" class="prop-name">track</a> | <span class="prop-name">.MuiSlider-track</span> | Styles applied to the track element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--trackFalse"></a><a href="#css--trackFalse" class="prop-name">trackFalse</a> | <span class="prop-name">.MuiSlider-trackFalse</span> | Styles applied to the track element if `track={false}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--trackInverted"></a><a href="#css--trackInverted" class="prop-name">trackInverted</a> | <span class="prop-name">.MuiSlider-trackInverted</span> | Styles applied to the track element if `track="inverted"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--thumb"></a><a href="#css--thumb" class="prop-name">thumb</a> | <span class="prop-name">.MuiSlider-thumb</span> | Styles applied to the thumb element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--thumbColorPrimary"></a><a href="#css--thumbColorPrimary" class="prop-name">thumbColorPrimary</a> | <span class="prop-name">.MuiSlider-thumbColorPrimary</span> | Styles applied to the thumb element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--thumbColorSecondary"></a><a href="#css--thumbColorSecondary" class="prop-name">thumbColorSecondary</a> | <span class="prop-name">.MuiSlider-thumbColorSecondary</span> | Styles applied to the thumb element if `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--active"></a><a href="#css--active" class="prop-name">active</a> | <span class="prop-name">.MuiSlider-active</span> | Pseudo-class applied to the thumb element if it's active.
| <a class="anchor-link" title="link to the rule name on this page" id="css--focusVisible"></a><a href="#css--focusVisible" class="prop-name">focusVisible</a> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the thumb element if keyboard focused.
| <a class="anchor-link" title="link to the rule name on this page" id="css--valueLabel"></a><a href="#css--valueLabel" class="prop-name">valueLabel</a> | <span class="prop-name">.MuiSlider-valueLabel</span> | Styles applied to the thumb label element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--mark"></a><a href="#css--mark" class="prop-name">mark</a> | <span class="prop-name">.MuiSlider-mark</span> | Styles applied to the mark element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--markActive"></a><a href="#css--markActive" class="prop-name">markActive</a> | <span class="prop-name">.MuiSlider-markActive</span> | Styles applied to the mark element if active (depending on the value).
| <a class="anchor-link" title="link to the rule name on this page" id="css--markLabel"></a><a href="#css--markLabel" class="prop-name">markLabel</a> | <span class="prop-name">.MuiSlider-markLabel</span> | Styles applied to the mark label element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--markLabelActive"></a><a href="#css--markLabelActive" class="prop-name">markLabelActive</a> | <span class="prop-name">.MuiSlider-markLabelActive</span> | Styles applied to the mark label element if active (depending on the value).

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Slider/Slider.js) for more detail.

## Demos

- [Slider](/components/slider/)

