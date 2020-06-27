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

## Component name

The `MuiCircularProgress` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">disableShrink</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the shrink animation is disabled. This only works if variant is `indeterminate`. |
| <span class="prop-name">size</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> | <span class="prop-default">40</span> | The size of the circle. If using a number, the pixel unit is assumed. If using a string, you need to provide the CSS unit, e.g '3rem'. |
| <span class="prop-name">thickness</span> | <span class="prop-type">number</span> | <span class="prop-default">3.6</span> | The thickness of the circle. |
| <span class="prop-name">value</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The value of the progress indicator for the determinate and static variants. Value between 0 and 100. |
| <span class="prop-name">variant</span> | <span class="prop-type">'determinate'<br>&#124;&nbsp;'indeterminate'<br>&#124;&nbsp;'static'</span> | <span class="prop-default">'indeterminate'</span> | The variant to use. Use indeterminate when there is no progress value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiCircularProgress-root</span> | Styles applied to the root element.
| <span class="prop-name">static</span> | <span class="prop-name">.MuiCircularProgress-static</span> | Styles applied to the root element if `variant="static"`.
| <span class="prop-name">indeterminate</span> | <span class="prop-name">.MuiCircularProgress-indeterminate</span> | Styles applied to the root element if `variant="indeterminate"`.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiCircularProgress-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiCircularProgress-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">svg</span> | <span class="prop-name">.MuiCircularProgress-svg</span> | Styles applied to the `svg` element.
| <span class="prop-name">circle</span> | <span class="prop-name">.MuiCircularProgress-circle</span> | Styles applied to the `circle` svg path.
| <span class="prop-name">circleStatic</span> | <span class="prop-name">.MuiCircularProgress-circleStatic</span> | Styles applied to the `circle` svg path if `variant="static"`.
| <span class="prop-name">circleIndeterminate</span> | <span class="prop-name">.MuiCircularProgress-circleIndeterminate</span> | Styles applied to the `circle` svg path if `variant="indeterminate"`.
| <span class="prop-name">circleDisableShrink</span> | <span class="prop-name">.MuiCircularProgress-circleDisableShrink</span> | Styles applied to the `circle` svg path if `disableShrink={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CircularProgress/CircularProgress.js) for more detail.

## Demos

- [Progress](/components/progress/)

