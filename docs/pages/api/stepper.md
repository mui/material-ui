---
filename: /packages/material-ui/src/Stepper/Stepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Stepper API

<p class="description">The API documentation of the Stepper React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Stepper from '@material-ui/core/Stepper';
// or
import { Stepper } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--activeStep"></a><a href="#props--activeStep" class="prop-name">activeStep</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Set the active step (zero based index). |
| <a class="anchor-link" id="props--alternativeLabel"></a><a href="#props--alternativeLabel" class="prop-name">alternativeLabel</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | Two or more `<Step />` components. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--connector"></a><a href="#props--connector" class="prop-name">connector</a> | <span class="prop-type">element</span> | <span class="prop-default">&lt;StepConnector /></span> | An element to be placed between each step. |
| <a class="anchor-link" id="props--nonLinear"></a><a href="#props--nonLinear" class="prop-name">nonLinear</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If set the `Stepper` will not assist in controlling steps for linear flow. |
| <a class="anchor-link" id="props--orientation"></a><a href="#props--orientation" class="prop-name">orientation</a> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The stepper orientation (layout flow direction). |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiStepper`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiStepper-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--horizontal"></a><a href="#css--horizontal" class="prop-name">horizontal</a> | <span class="prop-name">.MuiStepper-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <a class="anchor-link" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiStepper-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <a class="anchor-link" id="css--alternativeLabel"></a><a href="#css--alternativeLabel" class="prop-name">alternativeLabel</a> | <span class="prop-name">.MuiStepper-alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Stepper/Stepper.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Steppers](/components/steppers/)

