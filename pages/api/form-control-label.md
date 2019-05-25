---
filename: /packages/material-ui/src/FormControlLabel/FormControlLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControlLabel API

<p class="description">The API documentation of the FormControlLabel React component. Learn more about the properties and the CSS customization points.</p>

```js
import FormControlLabel from '@material-ui/core/FormControlLabel';
```

Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
Use this component if you want to display an extra label.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">checked</span> | <span class="prop-type">bool</span> |  | If `true`, the component appears selected. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">control</span> | <span class="prop-type">element</span> |  | A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the control will be disabled. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> |  | This property can be used to pass a ref callback to the `input` element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The text to be used in an enclosing label element. |
| <span class="prop-name">labelPlacement</span> | <span class="prop-type">enum:&nbsp;'end'&nbsp;&#124;<br>&nbsp;'start'&nbsp;&#124;<br>&nbsp;'top'&nbsp;&#124;<br>&nbsp;'bottom'<br></span> | <span class="prop-default">'end'</span> | The position of the label. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  |  |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.checked`.<br>*checked:* The `checked` value of the switch |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the component. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">labelPlacementStart</span> | Styles applied to the root element if `labelPlacement="start"`.
| <span class="prop-name">labelPlacementTop</span> | Styles applied to the root element if `labelPlacement="top"`.
| <span class="prop-name">labelPlacementBottom</span> | Styles applied to the root element if `labelPlacement="bottom"`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">label</span> | Styles applied to the label's Typography component.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormControlLabel/FormControlLabel.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiFormControlLabel`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)

