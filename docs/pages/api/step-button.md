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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Can be a `StepLabel` or a node to place inside `StepLabel` as children. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon displayed by the step label. |
| <a class="anchor-link" id="props--optional"></a><a href="#props--optional" class="prop-name">optional</a> | <span class="prop-type">node</span> |  | The optional node to display. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiStepButton`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiStepButton-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--horizontal"></a><a href="#css--horizontal" class="prop-name">horizontal</a> | <span class="prop-name">.MuiStepButton-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <a class="anchor-link" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiStepButton-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <a class="anchor-link" id="css--touchRipple"></a><a href="#css--touchRipple" class="prop-name">touchRipple</a> | <span class="prop-name">.MuiStepButton-touchRipple</span> | Styles applied to the `ButtonBase` touch-ripple.

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

