---
filename: /packages/material-ui/src/Link/Link.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Link API

<p class="description">The API documentation of the Link React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Link from '@material-ui/core/Link';
// or
import { Link } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the link. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'textPrimary'<br>&#124;&nbsp;'textSecondary'</span> | <span class="prop-default">'primary'</span> | The color of the link. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">element type</span> | <span class="prop-default">'a'</span> | The component used for the root node. Either a string to use a DOM element or a component.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <a class="anchor-link" id="props--TypographyClasses"></a><a href="#props--TypographyClasses" title="link to the prop on this page" class="prop-name">TypographyClasses</a> | <span class="prop-type">object</span> |  | `classes` prop applied to the [`Typography`](/api/typography/) element. |
| <a class="anchor-link" id="props--underline"></a><a href="#props--underline" title="link to the prop on this page" class="prop-name">underline</a> | <span class="prop-type">'none'<br>&#124;&nbsp;'hover'<br>&#124;&nbsp;'always'</span> | <span class="prop-default">'hover'</span> | Controls when the link should have an underline. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">string</span> | <span class="prop-default">'inherit'</span> | Applies the theme typography styles. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Typography](/api/typography/)).

## CSS

- Style sheet name: `MuiLink`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiLink-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--underlineNone"></a><a href="#css--underlineNone" class="prop-name">underlineNone</a> | <span class="prop-name">.MuiLink-underlineNone</span> | Styles applied to the root element if `underline="none"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--underlineHover"></a><a href="#css--underlineHover" class="prop-name">underlineHover</a> | <span class="prop-name">.MuiLink-underlineHover</span> | Styles applied to the root element if `underline="hover"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--underlineAlways"></a><a href="#css--underlineAlways" class="prop-name">underlineAlways</a> | <span class="prop-name">.MuiLink-underlineAlways</span> | Styles applied to the root element if `underline="always"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--button"></a><a href="#css--button" class="prop-name">button</a> | <span class="prop-name">.MuiLink-button</span> | Styles applied to the root element if `component="button"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--focusVisible"></a><a href="#css--focusVisible" class="prop-name">focusVisible</a> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the root element if the link is keyboard focused.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Link/Link.js) for more detail.

## Inheritance

The props of the [Typography](/api/typography/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Breadcrumbs](/components/breadcrumbs/)
- [Links](/components/links/)

