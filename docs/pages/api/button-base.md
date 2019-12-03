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

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--action"></a><a href="#props--action" class="prop-name">action</a> | <span class="prop-type">ref</span> |  | A ref for imperative actions. It currently only supports `focusVisible()` action. |
| <a class="anchor-link" id="props--centerRipple"></a><a href="#props--centerRipple" class="prop-name">centerRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">element type</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a DOM element or a component.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the base button will be disabled. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripple effect will be disabled.<br>⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `focusVisibleClassName`. |
| <a class="anchor-link" id="props--disableTouchRipple"></a><a href="#props--disableTouchRipple" class="prop-name">disableTouchRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the touch ripple effect will be disabled. |
| <a class="anchor-link" id="props--focusRipple"></a><a href="#props--focusRipple" class="prop-name">focusRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the base button will have a keyboard focus ripple. `disableRipple` must also be `false`. |
| <a class="anchor-link" id="props--focusVisibleClassName"></a><a href="#props--focusVisibleClassName" class="prop-name">focusVisibleClassName</a> | <span class="prop-type">string</span> |  | This prop can help a person know which element has the keyboard focus. The class name will be applied when the element gain the focus through a keyboard interaction. It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo). The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md). A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components if needed. |
| <a class="anchor-link" id="props--onFocusVisible"></a><a href="#props--onFocusVisible" class="prop-name">onFocusVisible</a> | <span class="prop-type">func</span> |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too. |
| <a class="anchor-link" id="props--TouchRippleProps"></a><a href="#props--TouchRippleProps" class="prop-name">TouchRippleProps</a> | <span class="prop-type">object</span> |  | Props applied to the `TouchRipple` element. |
| <a class="anchor-link" id="props--type"></a><a href="#props--type" class="prop-name">type</a> | <span class="prop-type">'submit'<br>&#124;&nbsp;'reset'<br>&#124;&nbsp;'button'</span> | <span class="prop-default">'button'</span> | Used to control the button's purpose. This prop passes the value to the `type` attribute of the native button component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiButtonBase`.
- Style sheet details:

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

