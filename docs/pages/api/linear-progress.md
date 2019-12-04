---
filename: /packages/material-ui/src/LinearProgress/LinearProgress.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# LinearProgress API

<p class="description">The API documentation of the LinearProgress React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import LinearProgress from '@material-ui/core/LinearProgress';
// or
import { LinearProgress } from '@material-ui/core';
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
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">number</span> |  | The value of the progress indicator for the determinate and buffer variants. Value between 0 and 100. |
| <a class="anchor-link" id="props--valueBuffer"></a><a href="#props--valueBuffer" title="link to the prop on this page" class="prop-name">valueBuffer</a> | <span class="prop-type">number</span> |  | The value for the buffer variant. Value between 0 and 100. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'determinate'<br>&#124;&nbsp;'indeterminate'<br>&#124;&nbsp;'buffer'<br>&#124;&nbsp;'query'</span> | <span class="prop-default">'indeterminate'</span> | The variant to use. Use indeterminate or query when there is no progress value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiLinearProgress`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiLinearProgress-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiLinearProgress-colorPrimary</span> | Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant-"buffer"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiLinearProgress-colorSecondary</span> | Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--determinate"></a><a href="#css--determinate" class="prop-name">determinate</a> | <span class="prop-name">.MuiLinearProgress-determinate</span> | Styles applied to the root element if `variant="determinate"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--indeterminate"></a><a href="#css--indeterminate" class="prop-name">indeterminate</a> | <span class="prop-name">.MuiLinearProgress-indeterminate</span> | Styles applied to the root element if `variant="indeterminate"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--buffer"></a><a href="#css--buffer" class="prop-name">buffer</a> | <span class="prop-name">.MuiLinearProgress-buffer</span> | Styles applied to the root element if `variant="buffer"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--query"></a><a href="#css--query" class="prop-name">query</a> | <span class="prop-name">.MuiLinearProgress-query</span> | Styles applied to the root element if `variant="query"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dashed"></a><a href="#css--dashed" class="prop-name">dashed</a> | <span class="prop-name">.MuiLinearProgress-dashed</span> | Styles applied to the additional bar element if `variant="buffer"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dashedColorPrimary"></a><a href="#css--dashedColorPrimary" class="prop-name">dashedColorPrimary</a> | <span class="prop-name">.MuiLinearProgress-dashedColorPrimary</span> | Styles applied to the additional bar element if `variant="buffer"` and `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dashedColorSecondary"></a><a href="#css--dashedColorSecondary" class="prop-name">dashedColorSecondary</a> | <span class="prop-name">.MuiLinearProgress-dashedColorSecondary</span> | Styles applied to the additional bar element if `variant="buffer"` and `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--bar"></a><a href="#css--bar" class="prop-name">bar</a> | <span class="prop-name">.MuiLinearProgress-bar</span> | Styles applied to the layered bar1 and bar2 elements.
| <a class="anchor-link" title="link to the rule name on this page" id="css--barColorPrimary"></a><a href="#css--barColorPrimary" class="prop-name">barColorPrimary</a> | <span class="prop-name">.MuiLinearProgress-barColorPrimary</span> | Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer".
| <a class="anchor-link" title="link to the rule name on this page" id="css--barColorSecondary"></a><a href="#css--barColorSecondary" class="prop-name">barColorSecondary</a> | <span class="prop-name">.MuiLinearProgress-barColorSecondary</span> | Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer".
| <a class="anchor-link" title="link to the rule name on this page" id="css--bar1Indeterminate"></a><a href="#css--bar1Indeterminate" class="prop-name">bar1Indeterminate</a> | <span class="prop-name">.MuiLinearProgress-bar1Indeterminate</span> | Styles applied to the bar1 element if `variant="indeterminate or query"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--bar1Determinate"></a><a href="#css--bar1Determinate" class="prop-name">bar1Determinate</a> | <span class="prop-name">.MuiLinearProgress-bar1Determinate</span> | Styles applied to the bar1 element if `variant="determinate"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--bar1Buffer"></a><a href="#css--bar1Buffer" class="prop-name">bar1Buffer</a> | <span class="prop-name">.MuiLinearProgress-bar1Buffer</span> | Styles applied to the bar1 element if `variant="buffer"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--bar2Indeterminate"></a><a href="#css--bar2Indeterminate" class="prop-name">bar2Indeterminate</a> | <span class="prop-name">.MuiLinearProgress-bar2Indeterminate</span> | Styles applied to the bar2 element if `variant="indeterminate or query"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--bar2Buffer"></a><a href="#css--bar2Buffer" class="prop-name">bar2Buffer</a> | <span class="prop-name">.MuiLinearProgress-bar2Buffer</span> | Styles applied to the bar2 element if `variant="buffer"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/LinearProgress/LinearProgress.js) for more detail.

## Demos

- [Progress](/components/progress/)

