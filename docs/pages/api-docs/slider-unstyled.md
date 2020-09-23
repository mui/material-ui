---
filename: /packages/material-ui-lab/src/SliderUnstyled/SliderUnstyled.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SliderUnstyled API

<p class="description">The API documentation of the SliderUnstyled React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SliderUnstyled from '@material-ui/lab/SliderUnstyled';
// or
import { SliderUnstyled } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).





## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">aria-label</span> | <span class="prop-type">string</span> |  | The label of the slider. |
| <span class="prop-name">aria-labelledby</span> | <span class="prop-type">string</span> |  | The id of the element containing a label for the slider. |
| <span class="prop-name">aria-valuetext</span> | <span class="prop-type">string</span> |  | A string value that provides a user-friendly name for the current value of the slider. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. |
| <span class="prop-name">color</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">Array&lt;number&gt;<br>&#124;&nbsp;number</span> |  | The default element value. Use when the component is not controlled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be disabled. |
| <span class="prop-name">getAriaLabel</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.<br><br>**Signature:**<br>`function(index: number) => string`<br>*index:* The thumb label's index to format. |
| <span class="prop-name">getAriaValueText</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.<br><br>**Signature:**<br>`function(value: number, index: number) => string`<br>*value:* The thumb label's value to format.<br>*index:* The thumb label's index to format. |
| <span class="prop-name">isRtl</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Indicates whether the theme context has rtl direction. It is set automatically. |
| <span class="prop-name">marks</span> | <span class="prop-type">Array&lt;{ label?: node, value: number }&gt;<br>&#124;&nbsp;bool</span> | <span class="prop-default">false</span> | Marks indicate predetermined values to which the user can move the slider. If `true` the marks will be spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <span class="prop-name">min</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the hidden `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the slider's value changed.<br><br>**Signature:**<br>`function(event: object, value: number \| number[]) => void`<br>*event:* The event source of the callback. **Warning**: This is a generic event not a change event.<br>*value:* The new value. |
| <span class="prop-name">onChangeCommitted</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the `mouseup` is triggered.<br><br>**Signature:**<br>`function(event: object, value: number \| number[]) => void`<br>*event:* The event source of the callback. **Warning**: This is a generic event not a change event.<br>*value:* The new value. |
| <span class="prop-name">orientation</span> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The slider orientation. |
| <span class="prop-name">scale</span> | <span class="prop-type">func</span> | <span class="prop-default">(x) => x</span> | A transformation function, to change the scale of the slider. |
| <span class="prop-name">step</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step.<br>When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| <span class="prop-name">ThumbComponent</span> | <span class="prop-type">elementType</span> |  | The component used to display the value label. |
| <span class="prop-name">track</span> | <span class="prop-type">'inverted'<br>&#124;&nbsp;'normal'<br>&#124;&nbsp;false</span> | <span class="prop-default">'normal'</span> | The track presentation:<br>- `normal` the track will render a bar representing the slider value. - `inverted` the track will render a bar representing the remaining slider value. - `false` the track will render without a bar. |
| <span class="prop-name">value</span> | <span class="prop-type">Array&lt;number&gt;<br>&#124;&nbsp;number</span> |  | The value of the slider. For ranged sliders, provide an array with two values. |
| <span class="prop-name">valueLabelDisplay</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;'off'<br>&#124;&nbsp;'on'</span> | <span class="prop-default">'off'</span> | Controls when the value label is displayed:<br>- `auto` the value label will display when the thumb is hovered or focused. - `on` will display persistently. - `off` will never display. |
| <span class="prop-name">valueLabelFormat</span> | <span class="prop-type">func<br>&#124;&nbsp;string</span> | <span class="prop-default">(x) => x</span> | The format function the value label's value.<br>When a function is provided, it should have the following signature:<br>- {number} value The value label's value to format - {number} index The value label's index to format |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

