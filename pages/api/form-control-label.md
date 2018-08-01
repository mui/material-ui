---
filename: /packages/material-ui/src/FormControlLabel/FormControlLabel.js
title: FormControlLabel API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControlLabel

<p class="description">The API documentation of the FormControlLabel React component.</p>

Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
Use this component if you want to display an extra label.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">checked</span> | <span class="prop-type">union:&nbsp;bool&nbsp;&#124;<br>&nbsp;string<br> |   | If `true`, the component appears selected. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">control</span> | <span class="prop-type">element |   | A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |   | If `true`, the control will be disabled. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> |   | Use that property to pass a ref callback to the native input component. |
| <span class="prop-name">label</span> | <span class="prop-type">node |   | The text to be used in an enclosing label element. |
| <span class="prop-name">labelPlacement</span> | <span class="prop-type">enum:&nbsp;'end'&nbsp;&#124;<br>&nbsp;'start'<br> | <span class="prop-default">'end'</span> | The position of the label. |
| <span class="prop-name">name</span> | <span class="prop-type">string |   |  |
| <span class="prop-name">onChange</span> | <span class="prop-type">func |   | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.checked`.<br>*checked:* The `checked` value of the switch |
| <span class="prop-name">value</span> | <span class="prop-type">string |   | The value of the component. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">labelPlacementStart</span> | Styles applied to the root element if `labelPlacement="start"`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">label</span> | Styles applied to the label's Typography component.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/FormControlLabel/FormControlLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormControlLabel`.

## Demos

- [Selection Controls](/demos/selection-controls)

