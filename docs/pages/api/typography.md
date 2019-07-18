---
filename: /packages/material-ui/src/Typography/Typography.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Typography API

<p class="description">The API documentation of the Typography React component. Learn more about the properties and the CSS customization points.</p>

```js
import Typography from '@material-ui/core/Typography';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">enum:&nbsp;'inherit', 'left', 'center', 'right', 'justify'<br></span> | <span class="prop-default">'inherit'</span> | Set the text-align on the component. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'<br></span> | <span class="prop-default">'initial'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component. |
| <span class="prop-name">display</span> | <span class="prop-type">enum:&nbsp;'initial'&nbsp;&#124;<br>&nbsp;'block'&nbsp;&#124;<br>&nbsp;'inline'<br></span> | <span class="prop-default">'initial'</span> | Controls the display type |
| <span class="prop-name">gutterBottom</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <span class="prop-name">noWrap</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| <span class="prop-name">paragraph</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'srOnly', 'inherit'<br></span> | <span class="prop-default">'body1'</span> | Applies the theme typography styles. |
| <span class="prop-name">variantMapping</span> | <span class="prop-type">object</span> | <span class="prop-default">{  h1: 'h1',  h2: 'h2',  h3: 'h3',  h4: 'h4',  h5: 'h5',  h6: 'h6',  subtitle1: 'h6',  subtitle2: 'h6',  body1: 'p',  body2: 'p',}</span> | We are empirically mapping the variant property to a range of different DOM element types. For instance, subtitle1 to `<h6>`. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `component` property. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">body2</span> | Styles applied to the root element if `variant="body2"`.
| <span class="prop-name">body1</span> | Styles applied to the root element if `variant="body1"`.
| <span class="prop-name">caption</span> | Styles applied to the root element if `variant="caption"`.
| <span class="prop-name">button</span> | Styles applied to the root element if `variant="button"`.
| <span class="prop-name">h1</span> | Styles applied to the root element if `variant="h1"`.
| <span class="prop-name">h2</span> | Styles applied to the root element if `variant="h2"`.
| <span class="prop-name">h3</span> | Styles applied to the root element if `variant="h3"`.
| <span class="prop-name">h4</span> | Styles applied to the root element if `variant="h4"`.
| <span class="prop-name">h5</span> | Styles applied to the root element if `variant="h5"`.
| <span class="prop-name">h6</span> | Styles applied to the root element if `variant="h6"`.
| <span class="prop-name">subtitle1</span> | Styles applied to the root element if `variant="subtitle1"`.
| <span class="prop-name">subtitle2</span> | Styles applied to the root element if `variant="subtitle2"`.
| <span class="prop-name">overline</span> | Styles applied to the root element if `variant="overline"`.
| <span class="prop-name">srOnly</span> | Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers.
| <span class="prop-name">alignLeft</span> | Styles applied to the root element if `align="left"`.
| <span class="prop-name">alignCenter</span> | Styles applied to the root element if `align="center"`.
| <span class="prop-name">alignRight</span> | Styles applied to the root element if `align="right"`.
| <span class="prop-name">alignJustify</span> | Styles applied to the root element if `align="justify"`.
| <span class="prop-name">noWrap</span> | Styles applied to the root element if `align="nowrap"`.
| <span class="prop-name">gutterBottom</span> | Styles applied to the root element if `gutterBottom={true}`.
| <span class="prop-name">paragraph</span> | Styles applied to the root element if `paragraph={true}`.
| <span class="prop-name">colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorTextPrimary</span> | Styles applied to the root element if `color="textPrimary"`.
| <span class="prop-name">colorTextSecondary</span> | Styles applied to the root element if `color="textSecondary"`.
| <span class="prop-name">colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">displayInline</span> | Styles applied to the root element if `display="inline"`.
| <span class="prop-name">displayBlock</span> | Styles applied to the root element if `display="block"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Typography/Typography.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTypography`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Breadcrumbs](/components/breadcrumbs/)
- [Typography](/components/typography/)

