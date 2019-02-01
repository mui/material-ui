---
filename: /packages/material-ui-lab/src/ToggleButtonGroup/ToggleButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButtonGroup API

<p class="description">The API documentation of the ToggleButtonGroup React component. Learn more about the properties and the CSS customization points.</p>

```js
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node</span> |   | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">exclusive</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, only allow one of the child ToggleButton values to be selected. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |   | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: object) => void`<br>*event:* The event source of the callback<br>*value:* of the selected buttons. When `exclusive` is true this is a single value; when false an array of selected values. If no value is selected and `exclusive` is true the value is null; when false an empty array. |
| <span class="prop-name">selected</span> | <span class="prop-type">union:&nbsp;bool&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br></span> | <span class="prop-default">'auto'</span> | If `true`, render the group in a selected state. If `auto` (the default) render in a selected state if `value` is not empty. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |   | The currently selected value within the group or an array of selected values when `exclusive` is false. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">selected</span> | Styles applied to the root element if `selected={true}` or `selected="auto" and `value` set.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButtonGroup/ToggleButtonGroup.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiToggleButtonGroup`.

## Demos

- [Toggle Button](/lab/toggle-button/)

