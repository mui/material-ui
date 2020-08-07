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

## Component name

The `MuiLinearProgress` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">value</span> | <span class="prop-type">number</span> |  | The value of the progress indicator for the determinate and buffer variants. Value between 0 and 100. |
| <span class="prop-name">valueBuffer</span> | <span class="prop-type">number</span> |  | The value for the buffer variant. Value between 0 and 100. |
| <span class="prop-name">variant</span> | <span class="prop-type">'buffer'<br>&#124;&nbsp;'determinate'<br>&#124;&nbsp;'indeterminate'<br>&#124;&nbsp;'query'</span> | <span class="prop-default">'indeterminate'</span> | The variant to use. Use indeterminate or query when there is no progress value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiLinearProgress-root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiLinearProgress-colorPrimary</span> | Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant="buffer"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiLinearProgress-colorSecondary</span> | Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`.
| <span class="prop-name">determinate</span> | <span class="prop-name">.MuiLinearProgress-determinate</span> | Styles applied to the root element if `variant="determinate"`.
| <span class="prop-name">indeterminate</span> | <span class="prop-name">.MuiLinearProgress-indeterminate</span> | Styles applied to the root element if `variant="indeterminate"`.
| <span class="prop-name">buffer</span> | <span class="prop-name">.MuiLinearProgress-buffer</span> | Styles applied to the root element if `variant="buffer"`.
| <span class="prop-name">query</span> | <span class="prop-name">.MuiLinearProgress-query</span> | Styles applied to the root element if `variant="query"`.
| <span class="prop-name">dashed</span> | <span class="prop-name">.MuiLinearProgress-dashed</span> | Styles applied to the additional bar element if `variant="buffer"`.
| <span class="prop-name">dashedColorPrimary</span> | <span class="prop-name">.MuiLinearProgress-dashedColorPrimary</span> | Styles applied to the additional bar element if `variant="buffer"` and `color="primary"`.
| <span class="prop-name">dashedColorSecondary</span> | <span class="prop-name">.MuiLinearProgress-dashedColorSecondary</span> | Styles applied to the additional bar element if `variant="buffer"` and `color="secondary"`.
| <span class="prop-name">bar</span> | <span class="prop-name">.MuiLinearProgress-bar</span> | Styles applied to the layered bar1 and bar2 elements.
| <span class="prop-name">barColorPrimary</span> | <span class="prop-name">.MuiLinearProgress-barColorPrimary</span> | Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer".
| <span class="prop-name">barColorSecondary</span> | <span class="prop-name">.MuiLinearProgress-barColorSecondary</span> | Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer".
| <span class="prop-name">bar1Indeterminate</span> | <span class="prop-name">.MuiLinearProgress-bar1Indeterminate</span> | Styles applied to the bar1 element if `variant="indeterminate or query"`.
| <span class="prop-name">bar1Determinate</span> | <span class="prop-name">.MuiLinearProgress-bar1Determinate</span> | Styles applied to the bar1 element if `variant="determinate"`.
| <span class="prop-name">bar1Buffer</span> | <span class="prop-name">.MuiLinearProgress-bar1Buffer</span> | Styles applied to the bar1 element if `variant="buffer"`.
| <span class="prop-name">bar2Indeterminate</span> | <span class="prop-name">.MuiLinearProgress-bar2Indeterminate</span> | Styles applied to the bar2 element if `variant="indeterminate or query"`.
| <span class="prop-name">bar2Buffer</span> | <span class="prop-name">.MuiLinearProgress-bar2Buffer</span> | Styles applied to the bar2 element if `variant="buffer"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/LinearProgress/LinearProgress.js) for more detail.

## Demos

- [Progress](/components/progress/)

