---
filename: /packages/material-ui-lab/src/Rating/Rating.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Rating API

<p class="description">The API documentation of the Rating React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Rating from '@material-ui/lab/Rating';
// or
import { Rating } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the rating will be disabled. |
| <a class="anchor-link" id="props--emptyIcon"></a><a href="#props--emptyIcon" class="prop-name">emptyIcon</a> | <span class="prop-type">node</span> |  | The icon to display when empty. |
| <a class="anchor-link" id="props--getLabelText"></a><a href="#props--getLabelText" class="prop-name">getLabelText</a> | <span class="prop-type">func</span> | <span class="prop-default">function defaultLabelText(value) {  return `${value} Star${value !== 1 ? 's' : ''}`;}</span> | Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.<br>For localization purposes, you can use the provided [translations](/guides/localization/).<br><br>**Signature:**<br>`function(value: number) => string`<br>*value:* The rating label's value to format. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name">icon</a> | <span class="prop-type">node</span> | <span class="prop-default">&lt;Star fontSize="inherit" /></span> | The icon to display. |
| <a class="anchor-link" id="props--IconContainerComponent"></a><a href="#props--IconContainerComponent" class="prop-name">IconContainerComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">function IconContainer(props) {  const { value, ...other } = props;  return &lt;span {...other} />;}</span> | The component containing the icon. |
| <a class="anchor-link" id="props--max"></a><a href="#props--max" class="prop-name">max</a> | <span class="prop-type">number</span> | <span class="prop-default">5</span> | Maximum rating. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" class="prop-name">name</a> | <span class="prop-type">string</span> |  | The name attribute of the radio `input` elements. If `readOnly` is false, the prop is required, this input name`should be unique within the parent form. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <a class="anchor-link" id="props--onChangeActive"></a><a href="#props--onChangeActive" class="prop-name">onChangeActive</a> | <span class="prop-type">func</span> |  | Callback function that is fired when the hover state changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <a class="anchor-link" id="props--precision"></a><a href="#props--precision" class="prop-name">precision</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The minimum increment value change allowed. |
| <a class="anchor-link" id="props--readOnly"></a><a href="#props--readOnly" class="prop-name">readOnly</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Removes all hover effects and pointer events. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the rating. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" class="prop-name">value</a> | <span class="prop-type">number</span> | <span class="prop-default">null</span> | The rating value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiRating`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiRating-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--sizeSmall"></a><a href="#css--sizeSmall" class="prop-name">sizeSmall</a> | <span class="prop-name">.MuiRating-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <a class="anchor-link" id="css--sizeLarge"></a><a href="#css--sizeLarge" class="prop-name">sizeLarge</a> | <span class="prop-name">.MuiRating-sizeLarge</span> | Styles applied to the root element if `size="large"`.
| <a class="anchor-link" id="css--readOnly"></a><a href="#css--readOnly" class="prop-name">readOnly</a> | <span class="prop-name">.MuiRating-readOnly</span> | Styles applied to the root element if `readOnly={true}`.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--focusVisible"></a><a href="#css--focusVisible" class="prop-name">focusVisible</a> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the root element if keyboard focused.
| <a class="anchor-link" id="css--visuallyhidden"></a><a href="#css--visuallyhidden" class="prop-name">visuallyhidden</a> | <span class="prop-name">.MuiRating-visuallyhidden</span> | Visually hide an element.
| <a class="anchor-link" id="css--pristine"></a><a href="#css--pristine" class="prop-name">pristine</a> | <span class="prop-name">.MuiRating-pristine</span> | Styles applied to the pristine label.
| <a class="anchor-link" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiRating-label</span> | Styles applied to the label elements.
| <a class="anchor-link" id="css--icon"></a><a href="#css--icon" class="prop-name">icon</a> | <span class="prop-name">.MuiRating-icon</span> | Styles applied to the icon wrapping elements.
| <a class="anchor-link" id="css--iconEmpty"></a><a href="#css--iconEmpty" class="prop-name">iconEmpty</a> | <span class="prop-name">.MuiRating-iconEmpty</span> | Styles applied to the icon wrapping elements when empty.
| <a class="anchor-link" id="css--iconFilled"></a><a href="#css--iconFilled" class="prop-name">iconFilled</a> | <span class="prop-name">.MuiRating-iconFilled</span> | Styles applied to the icon wrapping elements when filled.
| <a class="anchor-link" id="css--iconHover"></a><a href="#css--iconHover" class="prop-name">iconHover</a> | <span class="prop-name">.MuiRating-iconHover</span> | Styles applied to the icon wrapping elements when hover.
| <a class="anchor-link" id="css--iconFocus"></a><a href="#css--iconFocus" class="prop-name">iconFocus</a> | <span class="prop-name">.MuiRating-iconFocus</span> | Styles applied to the icon wrapping elements when focus.
| <a class="anchor-link" id="css--iconActive"></a><a href="#css--iconActive" class="prop-name">iconActive</a> | <span class="prop-name">.MuiRating-iconActive</span> | Styles applied to the icon wrapping elements when active.
| <a class="anchor-link" id="css--decimal"></a><a href="#css--decimal" class="prop-name">decimal</a> | <span class="prop-name">.MuiRating-decimal</span> | Styles applied to the icon wrapping elements when decimals are necessary.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Rating/Rating.js) for more detail.

## Demos

- [Rating](/components/rating/)

