---
filename: /packages/material-ui/src/FormHelperText/FormHelperText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormHelperText API

<p class="description">The API documentation of the FormHelperText React component. Learn more about the properties and the CSS customization points.</p>

```js
import FormHelperText from '@material-ui/core/FormHelperText';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'p'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should be displayed in a disabled state. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, helper text should be displayed in an error state. |
| <span class="prop-name">filled</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use filled classes key. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use focused classes key. |
| <span class="prop-name">margin</span> | <span class="prop-type">enum:&nbsp;'dense'<br></span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use required classes key. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'standard'&nbsp;&#124;<br>&nbsp;'outlined'&nbsp;&#124;<br>&nbsp;'filled'<br></span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">error</span> | Styles applied to the root element if `error={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">contained</span> | Styles applied to the root element if `variant="filled"` or `variant="outlined"`.
| <span class="prop-name">focused</span> | Styles applied to the root element if `focused={true}`.
| <span class="prop-name">filled</span> | Styles applied to the root element if `filled={true}`.
| <span class="prop-name">required</span> | Styles applied to the root element if `required={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormHelperText/FormHelperText.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiFormHelperText`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Text Fields](/components/text-fields/)

