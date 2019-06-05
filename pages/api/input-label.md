---
filename: /packages/material-ui/src/InputLabel/InputLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputLabel API

<p class="description">The API documentation of the InputLabel React component. Learn more about the properties and the CSS customization points.</p>

```js
import InputLabel from '@material-ui/core/InputLabel';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The contents of the `InputLabel`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableAnimation</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the transition animation is disabled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, apply disabled class. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, the label will be displayed in an error state. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool</span> |  | If `true`, the input of this label is focused. |
| <span class="prop-name">margin</span> | <span class="prop-type">enum:&nbsp;'dense'<br></span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | if `true`, the label will indicate that the input is required. |
| <span class="prop-name">shrink</span> | <span class="prop-type">bool</span> |  | If `true`, the label is shrunk. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'standard'&nbsp;&#124;<br>&nbsp;'outlined'&nbsp;&#124;<br>&nbsp;'filled'<br></span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([FormLabel](/api/form-label/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">focused</span> | Styles applied to the root element if `focused={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">error</span> | Styles applied to the root element if `error={true}`.
| <span class="prop-name">required</span> | Styles applied to the root element if `required={true}`.
| <span class="prop-name">asterisk</span> | Styles applied to the asterisk element.
| <span class="prop-name">formControl</span> | Styles applied to the root element if the component is a descendant of `FormControl`.
| <span class="prop-name">marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">shrink</span> | Styles applied to the `input` element if `shrink={true}`.
| <span class="prop-name">animated</span> | Styles applied to the `input` element if `disableAnimation={false}`.
| <span class="prop-name">filled</span> | Styles applied to the root element if `variant="filled"`.
| <span class="prop-name">outlined</span> | Styles applied to the root element if `variant="outlined"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/InputLabel/InputLabel.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiInputLabel`.

## Inheritance

The properties of the [FormLabel](/api/form-label/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Text Fields](/components/text-fields/)

