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

You can learn more about the difference by [reading our guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the link. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'textPrimary'<br>&#124;&nbsp;'textSecondary'</span> | <span class="prop-default">'primary'</span> | The color of the link. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'a'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">TypographyClasses</span> | <span class="prop-type">object</span> |  | `classes` prop applied to the [`Typography`](/api/typography/) element. |
| <span class="prop-name">underline</span> | <span class="prop-type">'none'<br>&#124;&nbsp;'hover'<br>&#124;&nbsp;'always'</span> | <span class="prop-default">'hover'</span> | Controls when the link should have an underline. |
| <span class="prop-name">variant</span> | <span class="prop-type">string</span> | <span class="prop-default">'inherit'</span> | Applies the theme typography styles. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Typography](/api/typography/)).

## CSS

- Style sheet name: `MuiLink`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiLink-root</span> | Styles applied to the root element.
| <span class="prop-name">underlineNone</span> | <span class="prop-name">MuiLink-underlineNone</span> | Styles applied to the root element if `underline="none"`.
| <span class="prop-name">underlineHover</span> | <span class="prop-name">MuiLink-underlineHover</span> | Styles applied to the root element if `underline="hover"`.
| <span class="prop-name">underlineAlways</span> | <span class="prop-name">MuiLink-underlineAlways</span> | Styles applied to the root element if `underline="always"`.
| <span class="prop-name">button</span> | <span class="prop-name">MuiLink-button</span> | Styles applied to the root element if `component="button"`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">Mui-focusVisible</span> | Pseudo-class applied to the root element if the link is keyboard focused.

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

