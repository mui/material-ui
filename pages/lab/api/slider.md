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
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |   | If `true`, the slider will be disabled. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <span class="prop-name">min</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |   | Callback function that is fired when the slider's value changed. |
| <span class="prop-name">onDragEnd</span> | <span class="prop-type">func</span> |   | Callback function that is fired when the slide has stopped moving. |
| <span class="prop-name">onDragStart</span> | <span class="prop-type">func</span> |   | Callback function that is fired when the slider has begun to move. |
| <span class="prop-name">step</span> | <span class="prop-type">number</span> |   | The granularity the slider can step through values. |
| <span class="prop-name">thumb</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br></span> | <span class="prop-default">SliderThumb</span> | The component used for the slider thumb |
| <span class="prop-name">thumbProps</span> | <span class="prop-type">object</span> |   | props spread into the thumb component |
| <span class="prop-name">track</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br></span> | <span class="prop-default">SliderTrack</span> | The component used for the slider track |
| <span class="prop-name">trackProps</span> | <span class="prop-type">object</span> |   | props spread into the track component |
| <span class="prop-name required">value *</span> | <span class="prop-type">number</span> |   | The value of the slider. |
| <span class="prop-name">vertical</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the slider will be vertical. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">container</span> | Styles applied to the container element.
| <span class="prop-name">activated</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `activated`.
| <span class="prop-name">disabled</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`.
| <span class="prop-name">focused</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `focused`.
| <span class="prop-name">jumped</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`.
| <span class="prop-name">vertical</span> | Class applied to the root, track and container to trigger JSS nested styles if `vertical`.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/Slider/Slider.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes/#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSlider`.

## Demos

- [Slider](/lab/slider/)

