---
filename: /packages/material-ui/src/Slider/Slider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slider API

<p class="description">The API documentation of the Slider React component. Learn more about the properties and the CSS customization points.</p>

```js
import Slider from '@material-ui/core/Slider';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">aria-label</span> | <span class="prop-type">string</span> |  | The label of the slider. |
| <span class="prop-name">aria-labelledby</span> | <span class="prop-type">string</span> |  | The id of the element containing a label for the slider. |
| <span class="prop-name">aria-valuetext</span> | <span class="prop-type">string</span> |  | A string value that provides a user-friendly name for the current value of the slider. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;arrayOf<br></span> |  | The default element value. Use when the component is not controlled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be disabled. |
| <span class="prop-name">getAriaValueText</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.<br><br>**Signature:**<br>`function(value: number, index: number) => void`<br>*value:* The thumb label's value to format<br>*index:* The thumb label's index to format |
| <span class="prop-name">marks</span> | <span class="prop-type">union:&nbsp;bool&nbsp;&#124;<br>&nbsp;array<br></span> | <span class="prop-default">[]</span> | Marks indicate predetermined values to which the user can move the slider. If `true` the marks will be spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <span class="prop-name">min</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the hidden `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the slider's value changed.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* The new value |
| <span class="prop-name">onChangeCommitted</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the `mouseup` is triggered.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* The new value |
| <span class="prop-name">orientation</span> | <span class="prop-type">enum:&nbsp;'horizontal'&nbsp;&#124;<br>&nbsp;'vertical'<br></span> | <span class="prop-default">'horizontal'</span> | The slider orientation. |
| <span class="prop-name">step</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The granularity with which the slider can step through values. (A "discrete" slider.) When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| <span class="prop-name">ThumbComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used to display the value label. |
| <span class="prop-name">value</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;arrayOf<br></span> |  | The value of the slider. For ranged sliders, provide an array with two values. |
| <span class="prop-name">ValueLabelComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ValueLabel</span> | The value label componnet. |
| <span class="prop-name">valueLabelDisplay</span> | <span class="prop-type">enum:&nbsp;'on'&nbsp;&#124;<br>&nbsp;'auto'&nbsp;&#124;<br>&nbsp;'off'<br></span> | <span class="prop-default">'off'</span> | Controls when the value label is displayed:<br>- `auto` the value label will display when the thumb is hovered or focused. - `on` will display persistently. - `off` will never display. |
| <span class="prop-name">valueLabelFormat</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br></span> | <span class="prop-default">x => x</span> | The format function the value label's value.<br>When a function is provided, it should have the following signature:<br>- {number} value The value label's value to format - {number} index The value label's index to format |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">marked</span> | Styles applied to the root element if `marks` is provided with at least one label.
| <span class="prop-name">vertical</span> | Pseudo-class applied to the root element if `orientation="vertical"`.
| <span class="prop-name">disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">rail</span> | Styles applied to the rail element.
| <span class="prop-name">track</span> | Styles applied to the track element.
| <span class="prop-name">thumb</span> | Styles applied to the thumb element.
| <span class="prop-name">active</span> | Pseudo-class applied to the thumb element if it's active.
| <span class="prop-name">focusVisible</span> | Pseudo-class applied to the thumb element if keyboard focused.
| <span class="prop-name">valueLabel</span> | Styles applied to the thumb label element.
| <span class="prop-name">mark</span> | Styles applied to the mark element.
| <span class="prop-name">markActive</span> | Styles applied to the mark element if active (depending on the value).
| <span class="prop-name">markLabel</span> | Styles applied to the mark label element.
| <span class="prop-name">markLabelActive</span> | Styles applied to the mark label element if active (depending on the value).

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Slider/Slider.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiSlider`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Slider](/components/slider/)

