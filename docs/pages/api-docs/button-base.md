---
filename: /packages/material-ui/src/ButtonBase/ButtonBase.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonBase API

<p class="description">The API documentation of the ButtonBase React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ButtonBase from '@material-ui/core/ButtonBase';
// or
import { ButtonBase } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

`ButtonBase` contains as few styles as possible.
It aims to be a simple building block for creating a button.
It contains a load of style reset and some focus/ripple logic.

## Component name

The `MuiButtonBase` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">ref</span> |  | A ref for imperative actions. It currently only supports `focusVisible()` action. |
| <span class="prop-name">centerRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">element type</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a HTML element or a component.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the base button will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripple effect will be disabled.<br>⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `focusVisibleClassName`. |
| <span class="prop-name">disableTouchRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the touch ripple effect will be disabled. |
| <span class="prop-name">focusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the base button will have a keyboard focus ripple. |
| <span class="prop-name">focusVisibleClassName</span> | <span class="prop-type">string</span> |  | This prop can help a person know which element has the keyboard focus. The class name will be applied when the element gain the focus through a keyboard interaction. It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo). The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md). A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components if needed. |
| <span class="prop-name">onFocusVisible</span> | <span class="prop-type">func</span> |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too. |
| <span class="prop-name">TouchRippleProps</span> | <span class="prop-type">object</span> |  | Props applied to the `TouchRipple` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiButtonBase-root</span> | Styles applied to the root element.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the root element if keyboard focused.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonBase/ButtonBase.js) for more detail.

## Demos

- [Buttons](/components/buttons/)

