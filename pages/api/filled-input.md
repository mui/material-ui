---
filename: /packages/material-ui/src/FilledInput/FilledInput.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FilledInput API

<p class="description">The API documentation of the FilledInput React component. Learn more about the properties and the CSS customization points.</p>

```js
import FilledInput from '@material-ui/core/FilledInput';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoComplete</span> | <span class="prop-type">string</span> |  | This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill). |
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be focused during the first mount. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">className</span> | <span class="prop-type">string</span> |  | The CSS class name of the wrapper element. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default `input` element value, useful when not controlling the component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be disabled. |
| <span class="prop-name">disableUnderline</span> | <span class="prop-type">bool</span> |  | If `true`, the input will not have an underline. |
| <span class="prop-name">endAdornment</span> | <span class="prop-type">node</span> |  | End `InputAdornment` for this component. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, the input will indicate an error. This is normally obtained via context from FormControl. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will take up the full width of its container. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <span class="prop-name">inputComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'input'</span> | The component used for the native input. Either a string to use a DOM element or a component. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> |  | This property can be used to pass a ref callback to the `input` element. |
| <span class="prop-name">margin</span> | <span class="prop-type">enum:&nbsp;'dense'&nbsp;&#124;<br>&nbsp;'none'<br></span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <span class="prop-name">multiline</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a textarea element will be rendered. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value`. |
| <span class="prop-name">placeholder</span> | <span class="prop-type">string</span> |  | The short hint displayed in the input before the user enters a value. |
| <span class="prop-name">readOnly</span> | <span class="prop-type">bool</span> |  | It prevents the user from changing the value of the field (not from interacting with the field). |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be required. |
| <span class="prop-name">rows</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br></span> |  | Number of rows to display when multiline option is set to true. |
| <span class="prop-name">rowsMax</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br></span> |  | Maximum number of rows to display when multiline option is set to true. |
| <span class="prop-name">startAdornment</span> | <span class="prop-type">node</span> |  | Start `InputAdornment` for this component. |
| <span class="prop-name">type</span> | <span class="prop-type">string</span> | <span class="prop-default">'text'</span> | Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types). |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the `input` element, required for a controlled component. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([InputBase](/api/input-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">underline</span> | Styles applied to the root element if `disableUnderline={false}`.
| <span class="prop-name">focused</span> | Styles applied to the root element if the component is focused.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">adornedStart</span> | Styles applied to the root element if `startAdornment` is provided.
| <span class="prop-name">adornedEnd</span> | Styles applied to the root element if `endAdornment` is provided.
| <span class="prop-name">error</span> | Styles applied to the root element if `error={true}`.
| <span class="prop-name">multiline</span> | Styles applied to the root element if `multiline={true}`.
| <span class="prop-name">input</span> | Styles applied to the `input` element.
| <span class="prop-name">inputMarginDense</span> | Styles applied to the `input` element if `margin="dense"`.
| <span class="prop-name">inputMultiline</span> | Styles applied to the `input` element if `multiline={true}`.
| <span class="prop-name">inputAdornedStart</span> | Styles applied to the `input` element if `startAdornment` is provided.
| <span class="prop-name">inputAdornedEnd</span> | Styles applied to the `input` element if `endAdornment` is provided.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FilledInput/FilledInput.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiFilledInput`.

## Inheritance

The properties of the [InputBase](/api/input-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Text Fields](/components/text-fields/)

