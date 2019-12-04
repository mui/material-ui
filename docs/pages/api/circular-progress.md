---
filename: /packages/material-ui/src/CircularProgress/CircularProgress.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CircularProgress API

<p class="description">The API documentation of the CircularProgress React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import CircularProgress from '@material-ui/core/CircularProgress';
// or
import { CircularProgress } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

## ARIA

If the progress bar is describing the loading progress of a particular region of a page,
you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
attribute to `true` on that region until it has finished loading.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'inherit'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--disableShrink"></a><a href="#props--disableShrink" title="link to the prop on this page" class="prop-name">disableShrink</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the shrink animation is disabled. This only works if variant is `indeterminate`. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" title="link to the prop on this page" class="prop-name">size</a> | <span class="prop-type">number<br>&#124;&nbsp;string</span> | <span class="prop-default">40</span> | The size of the circle. If using a number, the pixel unit is assumed. If using a string, you need to provide the CSS unit, e.g '3rem'. |
| <a class="anchor-link" id="props--thickness"></a><a href="#props--thickness" title="link to the prop on this page" class="prop-name">thickness</a> | <span class="prop-type">number</span> | <span class="prop-default">3.6</span> | The thickness of the circle. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The value of the progress indicator for the determinate and static variants. Value between 0 and 100. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'determinate'<br>&#124;&nbsp;'indeterminate'<br>&#124;&nbsp;'static'</span> | <span class="prop-default">'indeterminate'</span> | The variant to use. Use indeterminate when there is no progress value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiCircularProgress`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiCircularProgress-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--static"></a><a href="#css--static" class="prop-name">static</a> | <span class="prop-name">.MuiCircularProgress-static</span> | Styles applied to the root element if `variant="static"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--indeterminate"></a><a href="#css--indeterminate" class="prop-name">indeterminate</a> | <span class="prop-name">.MuiCircularProgress-indeterminate</span> | Styles applied to the root element if `variant="indeterminate"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiCircularProgress-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiCircularProgress-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--svg"></a><a href="#css--svg" class="prop-name">svg</a> | <span class="prop-name">.MuiCircularProgress-svg</span> | Styles applied to the `svg` element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--circle"></a><a href="#css--circle" class="prop-name">circle</a> | <span class="prop-name">.MuiCircularProgress-circle</span> | Styles applied to the `circle` svg path.
| <a class="anchor-link" title="link to the rule name on this page" id="css--circleStatic"></a><a href="#css--circleStatic" class="prop-name">circleStatic</a> | <span class="prop-name">.MuiCircularProgress-circleStatic</span> | Styles applied to the `circle` svg path if `variant="static"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--circleIndeterminate"></a><a href="#css--circleIndeterminate" class="prop-name">circleIndeterminate</a> | <span class="prop-name">.MuiCircularProgress-circleIndeterminate</span> | Styles applied to the `circle` svg path if `variant="indeterminate"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--circleDisableShrink"></a><a href="#css--circleDisableShrink" class="prop-name">circleDisableShrink</a> | <span class="prop-name">.MuiCircularProgress-circleDisableShrink</span> | Styles applied to the `circle` svg path if `disableShrink={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CircularProgress/CircularProgress.js) for more detail.

## Demos

- [Progress](/components/progress/)

