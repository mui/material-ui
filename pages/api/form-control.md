---
filename: /packages/material-ui/src/FormControl/FormControl.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControl API

<p class="description">The API documentation of the FormControl React component. Learn more about the properties and the CSS customization points.</p>

```js
import FormControl from '@material-ui/core/FormControl';
```

Provides context such as filled/focused/error/required for form inputs.
Relying on the context provides high flexibility and ensures that the state always stays
consistent across the children of the `FormControl`.
This context is used by the following components:
 - FormLabel
 - FormHelperText
 - Input
 - InputLabel

⚠️Only one input can be used within a FormControl.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The contents of the form control. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label, input and helper text should be displayed in a disabled state. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label should be displayed in an error state. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will take up the full width of its container. |
| <span class="prop-name">margin</span> | <span class="prop-type">enum:&nbsp;'none'&nbsp;&#124;<br>&nbsp;'dense'&nbsp;&#124;<br>&nbsp;'normal'<br></span> | <span class="prop-default">'none'</span> | If `dense` or `normal`, will adjust vertical spacing of this and contained components. |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the label will indicate that the input is required. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'standard'&nbsp;&#124;<br>&nbsp;'outlined'&nbsp;&#124;<br>&nbsp;'filled'<br></span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">marginNormal</span> | Styles applied to the root element if `margin="normal"`.
| <span class="prop-name">marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormControl/FormControl.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiFormControl`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)
- [Text Fields](/components/text-fields/)

