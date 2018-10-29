---
filename: /packages/material-ui-lab/src/SliderTrack/SliderTrack.js
title: SliderTrack API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SliderTrack

<p class="description">The API documentation of the SliderTrack React component. Learn more about the properties and the CSS customization points.</p>

```js
import SliderTrack from '@material-ui/lab/SliderTrack';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | The component used for each part of the track. Either a string to use a DOM element or a component. |
| <span class="prop-name required">max *</span> | <span class="prop-type">number</span> |   | max value of the corresponding slider |
| <span class="prop-name required">min *</span> | <span class="prop-type">number</span> |   | min value of the corresponding slider |
| <span class="prop-name required">state *</span> | <span class="prop-type">enum:&nbsp;'activated', 'disabled', 'focused', 'jumped', 'normal'<br></span> |   | state of the corresponding slider |
| <span class="prop-name required">value *</span> | <span class="prop-type">number</span> |   | value of the corresponding slider |
| <span class="prop-name required">vertical *</span> | <span class="prop-type">bool</span> |   | If `true`, the slider track will be vertical. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the track elements.
| <span class="prop-name">selected</span> | Styles applied to the track element that is selected .
| <span class="prop-name">unselected</span> | Styles applied to the track element that is unselected.
| <span class="prop-name">disabled</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`.
| <span class="prop-name">jumped</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`.
| <span class="prop-name">focused</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `focused`.
| <span class="prop-name">activated</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `activated`.
| <span class="prop-name">vertical</span> | Class applied to the root, track and container to trigger JSS nested styles if `vertical`.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/SliderTrack/SliderTrack.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes/#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSliderTrack`.

