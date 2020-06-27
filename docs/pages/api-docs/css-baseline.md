---
filename: /packages/material-ui/src/CssBaseline/CssBaseline.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CssBaseline API

<p class="description">The API documentation of the CssBaseline React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import CssBaseline from '@material-ui/core/CssBaseline';
// or
import { CssBaseline } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Kickstart an elegant, consistent, and simple baseline to build upon.

## Component name

The `MuiCssBaseline` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> | <span class="prop-default">null</span> | You can wrap a node. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The component cannot hold a ref.


## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">@global</span> | | Apply global styles.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CssBaseline/CssBaseline.js) for more detail.

## Demos

- [Css Baseline](/components/css-baseline/)

