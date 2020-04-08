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



## Component name

The `MuiRating` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">number</span> | <span class="prop-default">null</span> | The default value. Use when the component is not controlled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the rating will be disabled. |
| <span class="prop-name">emptyIcon</span> | <span class="prop-type">node</span> |  | The icon to display when empty. |
| <span class="prop-name">emptyLabelText</span> | <span class="prop-type">node</span> | <span class="prop-default">'Empty'</span> | The label read when the rating input is empty. |
| <span class="prop-name">getLabelText</span> | <span class="prop-type">func</span> | <span class="prop-default">function defaultLabelText(value) {  return `${value} Star${value !== 1 ? 's' : ''}`;}</span> | Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.<br>For localization purposes, you can use the provided [translations](/guides/localization/).<br><br>**Signature:**<br>`function(value: number) => string`<br>*value:* The rating label's value to format. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;Star fontSize="inherit" /></span> | The icon to display. |
| <span class="prop-name">IconContainerComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">function IconContainer(props) {  const { value, ...other } = props;  return &lt;span {...other} />;}</span> | The component containing the icon. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">5</span> | Maximum rating. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | The name attribute of the radio `input` elements. If `readOnly` is false, the prop is required, this input name`should be unique within the parent form. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <span class="prop-name">onChangeActive</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the hover state changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback.<br>*value:* The new value. |
| <span class="prop-name">precision</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The minimum increment value change allowed. |
| <span class="prop-name">readOnly</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Removes all hover effects and pointer events. |
| <span class="prop-name">size</span> | <span class="prop-type">'large'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the rating. |
| <span class="prop-name">value</span> | <span class="prop-type">number</span> |  | The rating value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiRating-root</span> | Styles applied to the root element.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiRating-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | <span class="prop-name">.MuiRating-sizeLarge</span> | Styles applied to the root element if `size="large"`.
| <span class="prop-name">readOnly</span> | <span class="prop-name">.MuiRating-readOnly</span> | Styles applied to the root element if `readOnly={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the root element if keyboard focused.
| <span class="prop-name">visuallyhidden</span> | <span class="prop-name">.MuiRating-visuallyhidden</span> | Visually hide an element.
| <span class="prop-name">pristine</span> | <span class="prop-name">.MuiRating-pristine</span> | Styles applied to the pristine label.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiRating-label</span> | Styles applied to the label elements.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiRating-icon</span> | Styles applied to the icon wrapping elements.
| <span class="prop-name">iconEmpty</span> | <span class="prop-name">.MuiRating-iconEmpty</span> | Styles applied to the icon wrapping elements when empty.
| <span class="prop-name">iconFilled</span> | <span class="prop-name">.MuiRating-iconFilled</span> | Styles applied to the icon wrapping elements when filled.
| <span class="prop-name">iconHover</span> | <span class="prop-name">.MuiRating-iconHover</span> | Styles applied to the icon wrapping elements when hover.
| <span class="prop-name">iconFocus</span> | <span class="prop-name">.MuiRating-iconFocus</span> | Styles applied to the icon wrapping elements when focus.
| <span class="prop-name">iconActive</span> | <span class="prop-name">.MuiRating-iconActive</span> | Styles applied to the icon wrapping elements when active.
| <span class="prop-name">decimal</span> | <span class="prop-name">.MuiRating-decimal</span> | Styles applied to the icon wrapping elements when decimals are necessary.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Rating/Rating.js) for more detail.

## Demos

- [Rating](/components/rating/)

