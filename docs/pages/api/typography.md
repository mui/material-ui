---
filename: /packages/material-ui/src/Typography/Typography.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Typography API

<p class="description">The API documentation of the Typography React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Typography from '@material-ui/core/Typography';
// or
import { Typography } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--align"></a><a href="#props--align" title="link to the prop on this page" class="prop-name">align</a> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'justify'</span> | <span class="prop-default">'inherit'</span> | Set the text-align on the component. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'initial'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'textPrimary'<br>&#124;&nbsp;'textSecondary'<br>&#124;&nbsp;'error'</span> | <span class="prop-default">'initial'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component. |
| <a class="anchor-link" id="props--display"></a><a href="#props--display" title="link to the prop on this page" class="prop-name">display</a> | <span class="prop-type">'initial'<br>&#124;&nbsp;'block'<br>&#124;&nbsp;'inline'</span> | <span class="prop-default">'initial'</span> | Controls the display type |
| <a class="anchor-link" id="props--gutterBottom"></a><a href="#props--gutterBottom" title="link to the prop on this page" class="prop-name">gutterBottom</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <a class="anchor-link" id="props--noWrap"></a><a href="#props--noWrap" title="link to the prop on this page" class="prop-name">noWrap</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.<br>Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow). |
| <a class="anchor-link" id="props--paragraph"></a><a href="#props--paragraph" title="link to the prop on this page" class="prop-name">paragraph</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'h1'<br>&#124;&nbsp;'h2'<br>&#124;&nbsp;'h3'<br>&#124;&nbsp;'h4'<br>&#124;&nbsp;'h5'<br>&#124;&nbsp;'h6'<br>&#124;&nbsp;'subtitle1'<br>&#124;&nbsp;'subtitle2'<br>&#124;&nbsp;'body1'<br>&#124;&nbsp;'body2'<br>&#124;&nbsp;'caption'<br>&#124;&nbsp;'button'<br>&#124;&nbsp;'overline'<br>&#124;&nbsp;'srOnly'<br>&#124;&nbsp;'inherit'</span> | <span class="prop-default">'body1'</span> | Applies the theme typography styles. |
| <a class="anchor-link" id="props--variantMapping"></a><a href="#props--variantMapping" title="link to the prop on this page" class="prop-name">variantMapping</a> | <span class="prop-type">object</span> | <span class="prop-default">{  h1: 'h1',  h2: 'h2',  h3: 'h3',  h4: 'h4',  h5: 'h5',  h6: 'h6',  subtitle1: 'h6',  subtitle2: 'h6',  body1: 'p',  body2: 'p',}</span> | We are empirically mapping the variant prop to a range of different DOM element types. For instance, subtitle1 to `<h6>`. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `component` prop. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTypography`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTypography-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--body2"></a><a href="#css--body2" class="prop-name">body2</a> | <span class="prop-name">.MuiTypography-body2</span> | Styles applied to the root element if `variant="body2"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--body1"></a><a href="#css--body1" class="prop-name">body1</a> | <span class="prop-name">.MuiTypography-body1</span> | Styles applied to the root element if `variant="body1"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--caption"></a><a href="#css--caption" class="prop-name">caption</a> | <span class="prop-name">.MuiTypography-caption</span> | Styles applied to the root element if `variant="caption"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--button"></a><a href="#css--button" class="prop-name">button</a> | <span class="prop-name">.MuiTypography-button</span> | Styles applied to the root element if `variant="button"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--h1"></a><a href="#css--h1" class="prop-name">h1</a> | <span class="prop-name">.MuiTypography-h1</span> | Styles applied to the root element if `variant="h1"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--h2"></a><a href="#css--h2" class="prop-name">h2</a> | <span class="prop-name">.MuiTypography-h2</span> | Styles applied to the root element if `variant="h2"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--h3"></a><a href="#css--h3" class="prop-name">h3</a> | <span class="prop-name">.MuiTypography-h3</span> | Styles applied to the root element if `variant="h3"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--h4"></a><a href="#css--h4" class="prop-name">h4</a> | <span class="prop-name">.MuiTypography-h4</span> | Styles applied to the root element if `variant="h4"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--h5"></a><a href="#css--h5" class="prop-name">h5</a> | <span class="prop-name">.MuiTypography-h5</span> | Styles applied to the root element if `variant="h5"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--h6"></a><a href="#css--h6" class="prop-name">h6</a> | <span class="prop-name">.MuiTypography-h6</span> | Styles applied to the root element if `variant="h6"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--subtitle1"></a><a href="#css--subtitle1" class="prop-name">subtitle1</a> | <span class="prop-name">.MuiTypography-subtitle1</span> | Styles applied to the root element if `variant="subtitle1"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--subtitle2"></a><a href="#css--subtitle2" class="prop-name">subtitle2</a> | <span class="prop-name">.MuiTypography-subtitle2</span> | Styles applied to the root element if `variant="subtitle2"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--overline"></a><a href="#css--overline" class="prop-name">overline</a> | <span class="prop-name">.MuiTypography-overline</span> | Styles applied to the root element if `variant="overline"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--srOnly"></a><a href="#css--srOnly" class="prop-name">srOnly</a> | <span class="prop-name">.MuiTypography-srOnly</span> | Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignLeft"></a><a href="#css--alignLeft" class="prop-name">alignLeft</a> | <span class="prop-name">.MuiTypography-alignLeft</span> | Styles applied to the root element if `align="left"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignCenter"></a><a href="#css--alignCenter" class="prop-name">alignCenter</a> | <span class="prop-name">.MuiTypography-alignCenter</span> | Styles applied to the root element if `align="center"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignRight"></a><a href="#css--alignRight" class="prop-name">alignRight</a> | <span class="prop-name">.MuiTypography-alignRight</span> | Styles applied to the root element if `align="right"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignJustify"></a><a href="#css--alignJustify" class="prop-name">alignJustify</a> | <span class="prop-name">.MuiTypography-alignJustify</span> | Styles applied to the root element if `align="justify"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--noWrap"></a><a href="#css--noWrap" class="prop-name">noWrap</a> | <span class="prop-name">.MuiTypography-noWrap</span> | Styles applied to the root element if `nowrap={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--gutterBottom"></a><a href="#css--gutterBottom" class="prop-name">gutterBottom</a> | <span class="prop-name">.MuiTypography-gutterBottom</span> | Styles applied to the root element if `gutterBottom={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paragraph"></a><a href="#css--paragraph" class="prop-name">paragraph</a> | <span class="prop-name">.MuiTypography-paragraph</span> | Styles applied to the root element if `paragraph={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorInherit"></a><a href="#css--colorInherit" class="prop-name">colorInherit</a> | <span class="prop-name">.MuiTypography-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiTypography-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiTypography-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorTextPrimary"></a><a href="#css--colorTextPrimary" class="prop-name">colorTextPrimary</a> | <span class="prop-name">.MuiTypography-colorTextPrimary</span> | Styles applied to the root element if `color="textPrimary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorTextSecondary"></a><a href="#css--colorTextSecondary" class="prop-name">colorTextSecondary</a> | <span class="prop-name">.MuiTypography-colorTextSecondary</span> | Styles applied to the root element if `color="textSecondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorError"></a><a href="#css--colorError" class="prop-name">colorError</a> | <span class="prop-name">.MuiTypography-colorError</span> | Styles applied to the root element if `color="error"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--displayInline"></a><a href="#css--displayInline" class="prop-name">displayInline</a> | <span class="prop-name">.MuiTypography-displayInline</span> | Styles applied to the root element if `display="inline"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--displayBlock"></a><a href="#css--displayBlock" class="prop-name">displayBlock</a> | <span class="prop-name">.MuiTypography-displayBlock</span> | Styles applied to the root element if `display="block"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Typography/Typography.js) for more detail.

## Demos

- [Breadcrumbs](/components/breadcrumbs/)
- [Typography](/components/typography/)

