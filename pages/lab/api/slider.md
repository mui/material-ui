---
filename: /packages/material-ui-lab/src/Slider/Slider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slider



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |  | If `true`, the slider will be disabled. |
| <span class="prop-name">max</span> | <span class="prop-type">number | <span class="prop-default">100</span> | The maximum allowed value of the slider. Should not be equal to min. |
| <span class="prop-name">min</span> | <span class="prop-type">number | <span class="prop-default">0</span> | The minimum allowed value of the slider. Should not be equal to max. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func |  | Callback function that is fired when the slider's value changed. |
| <span class="prop-name">onDragEnd</span> | <span class="prop-type">func |  | Callback function that is fired when the slide has stopped moving. |
| <span class="prop-name">onDragStart</span> | <span class="prop-type">func |  | Callback function that is fired when the slider has begun to move. |
| <span class="prop-name">reverse</span> | <span class="prop-type">bool |  | If `true`, the slider will be reversed. |
| <span class="prop-name">step</span> | <span class="prop-type">number |  | The granularity the slider can step through values. |
| <span class="prop-name required">value *</span> | <span class="prop-type">number |  | The value of the slider. |
| <span class="prop-name">vertical</span> | <span class="prop-type">bool |  | If `true`, the slider will be vertical. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Slider](/lab/slider)

