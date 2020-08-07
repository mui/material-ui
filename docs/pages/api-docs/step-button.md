---
filename: /packages/material-ui/src/StepButton/StepButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepButton API

<p class="description">The API documentation of the StepButton React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import StepButton from '@material-ui/core/StepButton';
// or
import { StepButton } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiStepButton` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Can be a `StepLabel` or a node to place inside `StepLabel` as children. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon displayed by the step label. |
| <span class="prop-name">optional</span> | <span class="prop-type">node</span> |  | The optional node to display. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiStepButton-root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | <span class="prop-name">.MuiStepButton-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiStepButton-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">touchRipple</span> | <span class="prop-name">.MuiStepButton-touchRipple</span> | Styles applied to the `ButtonBase` touch-ripple.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepButton/StepButton.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Steppers](/components/steppers/)

