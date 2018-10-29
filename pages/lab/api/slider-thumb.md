---
filename: /packages/material-ui-lab/src/SliderThumb/SliderThumb.js
title: SliderThumb API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SliderThumb

<p class="description">The API documentation of the SliderThumb React component. Learn more about the properties and the CSS customization points.</p>

```js
import SliderThumb from '@material-ui/lab/SliderThumb';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">icon</span> | <span class="prop-type">object</span> |   |  |
| <span class="prop-name required">max *</span> | <span class="prop-type">number</span> |   | max value of the corresponding slider |
| <span class="prop-name required">min *</span> | <span class="prop-type">number</span> |   | min value of the corresponding slider |
| <span class="prop-name required">state *</span> | <span class="prop-type">enum:&nbsp;'activated', 'disabled', 'focused', 'jumped', 'normal'<br></span> |   | state of the corresponding slider |
| <span class="prop-name required">value *</span> | <span class="prop-type">number</span> |   | value of the corresponding slider |
| <span class="prop-name required">vertical *</span> | <span class="prop-type">bool</span> |   | If `true`, the slider track will be vertical. |

Any other properties supplied will be spread to the root element ([ButtonBase](/api/button-base/)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">wrapper</span> | 
| <span class="prop-name">root</span> | 
| <span class="prop-name">iconWrapper</span> | Class applied to the thumb element if custom thumb icon provided.
| <span class="prop-name">icon</span> | 
| <span class="prop-name">disabled</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`.
| <span class="prop-name">jumped</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`.
| <span class="prop-name">focused</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `focused`.
| <span class="prop-name">activated</span> | Class applied to the track and thumb elements to trigger JSS nested styles if `activated`.
| <span class="prop-name">vertical</span> | Class applied to the root, track and container to trigger JSS nested styles if `vertical`.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/SliderThumb/SliderThumb.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes/#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSliderThumb`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

