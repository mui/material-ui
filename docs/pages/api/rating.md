---
filename: /packages/material-ui-lab/src/Rating/Rating.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Rating API

<p class="description">The API documentation of the Rating React component. Learn more about the properties and the CSS customization points.</p>

```js
import Rating from '@material-ui/lab/Rating';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the rating will be disabled. |
| <span class="prop-name">emptyIcon</span> | <span class="prop-type">node</span> |  | The icon to display when empty. |
| <span class="prop-name">getLabelText</span> | <span class="prop-type">func</span> | <span class="prop-default">function defaultLabelText(value) {  return `${value} Star${value !== 1 ? 's' : ''}`;}</span> | Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.<br><br>**Signature:**<br>`function(value: number) => void`<br>*value:* The rating label's value to format |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;Star fontSize="inherit" /></span> | The icon to display. |
| <span class="prop-name">IconContainerComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">function IconContainer(props) {  const { value, ...other } = props;  return &lt;div {...other} />;}</span> | The component containing the icon. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">5</span> | Maximum rating. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | Name attribute of the radio `input` elements. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback<br>*value:* The new value |
| <span class="prop-name">onChangeActive</span> | <span class="prop-type">func</span> |  | Callback function that is fired when the hover state changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* The new value |
| <span class="prop-name">precision</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The minimum increment value change allowed. |
| <span class="prop-name">readOnly</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Removes all hover effects and pointer events. |
| <span class="prop-name">size</span> | <span class="prop-type">enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'&nbsp;&#124;<br>&nbsp;'large'<br></span> | <span class="prop-default">'medium'</span> | The size of the rating. |
| <span class="prop-name">value</span> | <span class="prop-type">number</span> | <span class="prop-default">null</span> | The rating value. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` prop.
This prop accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | Styles applied to the root element if `size="large"`.
| <span class="prop-name">readOnly</span> | Styles applied to the root element if `readOnly={true}`.
| <span class="prop-name">disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">focusVisible</span> | Pseudo-class applied to the root element if keyboard focused.
| <span class="prop-name">visuallyhidden</span> | Visually hide an element.
| <span class="prop-name">pristine</span> | Styles applied to the pristine label.
| <span class="prop-name">label</span> | Styles applied to the label elements.
| <span class="prop-name">icon</span> | Styles applied to the icon wrapping elements.
| <span class="prop-name">iconEmpty</span> | Styles applied to the icon wrapping elements when empty.
| <span class="prop-name">iconFilled</span> | Styles applied to the icon wrapping elements when filled.
| <span class="prop-name">iconHover</span> | Styles applied to the icon wrapping elements when hover.
| <span class="prop-name">iconFocus</span> | Styles applied to the icon wrapping elements when focus.
| <span class="prop-name">iconActive</span> | Styles applied to the icon wrapping elements when active.
| <span class="prop-name">decimal</span> | Styles applied to the icon wrapping elements when decimals are necessary.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Rating/Rating.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiRating`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Rating](/components/rating/)

