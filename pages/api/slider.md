---
filename: /packages/material-ui-lab/src/Slider/Slider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slider API

<p class="description">The API documentation of the Slider React component. Learn more about the properties and the CSS customization points.</p>

```js
import Slider from '@material-ui/lab/Slider';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">aria-label</span> | <span class="prop-type">string</span> |  | An alternative to `aria-labelledby`. |
| <span class="prop-name">aria-labelledby</span> | <span class="prop-type">string</span> |  | Refers to the element containing the name of the slider. |
| <span class="prop-name">aria-valuetext</span> | <span class="prop-type">string</span> |  | A string value that provides a user-friendly name for the current value of the slider. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;arrayOf<br></span> |  | The default element value, useful when not controlling the component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be disabled. |
| <span class="prop-name">getAriaValueText</span> | <span class="prop-type">func</span> |  | Returns a string value that provides a user-friendly name for the current value of the slider.<br><br>**Signature:**<br>`function(value: number, index: number) => void`<br>*value:* The thumb label's value to format<br>*index:* The thumb label's index to format |
| <span class="prop-name">marks</span> | <span class="prop-type">union:&nbsp;bool&nbsp;&#124;<br>&nbsp;array<br></span> | <span class="prop-default">[]</span> | Marks represent predetermined values to which the user can move the slider. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <span class="prop-name">min</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the hidden `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the slider's value changed.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* The new value |
| <span class="prop-name">onChangeCommitted</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the mouseup is triggerd.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* The new value |
| <span class="prop-name">orientation</span> | <span class="prop-type">enum:&nbsp;'horizontal'&nbsp;&#124;<br>&nbsp;'vertical'<br></span> | <span class="prop-default">'horizontal'</span> | The stepper orientation (layout flow direction). |
| <span class="prop-name">step</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The granularity the slider can step through values. When step is `null`, users can only slide the thumbs onto marks. |
| <span class="prop-name">value</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;arrayOf<br></span> |  | The value of the slider. |
| <span class="prop-name">ValueLabelComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ValueLabel</span> | The value label. |
| <span class="prop-name">valueLabelDisplay</span> | <span class="prop-type">enum:&nbsp;'on'&nbsp;&#124;<br>&nbsp;'active'&nbsp;&#124;<br>&nbsp;'off'<br></span> | <span class="prop-default">'active'</span> | Show value label. |
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
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">rtl</span> | Styles applied to the root element if the theme is RTL.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">rail</span> | Styles applied to the rail element.
| <span class="prop-name">track</span> | Styles applied to the track element.
| <span class="prop-name">thumb</span> | Styles applied to the thumb element.
| <span class="prop-name">active</span> | Styles applied to the thumb element if it's active.
| <span class="prop-name">valueLabel</span> | Styles applied to the thumb label element.
| <span class="prop-name">mark</span> | Styles applied to the mark element.
| <span class="prop-name">markActive</span> | Styles applied to the mark element if active (depending on the value).
| <span class="prop-name">markLabel</span> | Styles applied to the mark label element.
| <span class="prop-name">markLabelActive</span> | Styles applied to the mark label element if active (depending on the value).

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Slider/Slider.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiSlider`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Slider](/components/slider/)

