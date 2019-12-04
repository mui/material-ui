---
filename: /packages/material-ui/src/MobileStepper/MobileStepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MobileStepper API

<p class="description">The API documentation of the MobileStepper React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import MobileStepper from '@material-ui/core/MobileStepper';
// or
import { MobileStepper } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--activeStep"></a><a href="#props--activeStep" title="link to the prop on this page" class="prop-name">activeStep</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Set the active step (zero based index). Defines which dot is highlighted when the variant is 'dots'. |
| <a class="anchor-link" id="props--backButton"></a><a href="#props--backButton" title="link to the prop on this page" class="prop-name">backButton</a> | <span class="prop-type">node</span> |  | A back button element. For instance, it can be a `Button` or an `IconButton`. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--LinearProgressProps"></a><a href="#props--LinearProgressProps" title="link to the prop on this page" class="prop-name">LinearProgressProps</a> | <span class="prop-type">object</span> |  | Props applied to the `LinearProgress` element. |
| <a class="anchor-link" id="props--nextButton"></a><a href="#props--nextButton" title="link to the prop on this page" class="prop-name">nextButton</a> | <span class="prop-type">node</span> |  | A next button element. For instance, it can be a `Button` or an `IconButton`. |
| <a class="anchor-link" id="props--position"></a><a href="#props--position" title="link to the prop on this page" class="prop-name">position</a> | <span class="prop-type">'bottom'<br>&#124;&nbsp;'top'<br>&#124;&nbsp;'static'</span> | <span class="prop-default">'bottom'</span> | Set the positioning type. |
| <a class="anchor-link" id="props--steps"></a><a href="#props--steps" title="link to the prop on this page" class="prop-name required">steps&nbsp;*</a> | <span class="prop-type">number</span> |  | The total steps. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'text'<br>&#124;&nbsp;'dots'<br>&#124;&nbsp;'progress'</span> | <span class="prop-default">'dots'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiMobileStepper`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiMobileStepper-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--positionBottom"></a><a href="#css--positionBottom" class="prop-name">positionBottom</a> | <span class="prop-name">.MuiMobileStepper-positionBottom</span> | Styles applied to the root element if `position="bottom"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--positionTop"></a><a href="#css--positionTop" class="prop-name">positionTop</a> | <span class="prop-name">.MuiMobileStepper-positionTop</span> | Styles applied to the root element if `position="top"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--positionStatic"></a><a href="#css--positionStatic" class="prop-name">positionStatic</a> | <span class="prop-name">.MuiMobileStepper-positionStatic</span> | Styles applied to the root element if `position="static"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dots"></a><a href="#css--dots" class="prop-name">dots</a> | <span class="prop-name">.MuiMobileStepper-dots</span> | Styles applied to the dots container if `variant="dots"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dot"></a><a href="#css--dot" class="prop-name">dot</a> | <span class="prop-name">.MuiMobileStepper-dot</span> | Styles applied to each dot if `variant="dots"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dotActive"></a><a href="#css--dotActive" class="prop-name">dotActive</a> | <span class="prop-name">.MuiMobileStepper-dotActive</span> | Styles applied to a dot if `variant="dots"` and this is the active step.
| <a class="anchor-link" title="link to the rule name on this page" id="css--progress"></a><a href="#css--progress" class="prop-name">progress</a> | <span class="prop-name">.MuiMobileStepper-progress</span> | Styles applied to the Linear Progress component if `variant="progress"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/MobileStepper/MobileStepper.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Steppers](/components/steppers/)

