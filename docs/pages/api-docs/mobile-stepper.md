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



## Component name

The `MuiMobileStepper` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">activeStep</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Set the active step (zero based index). Defines which dot is highlighted when the variant is 'dots'. |
| <span class="prop-name">backButton</span> | <span class="prop-type">node</span> |  | A back button element. For instance, it can be a `Button` or an `IconButton`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">LinearProgressProps</span> | <span class="prop-type">object</span> |  | Props applied to the `LinearProgress` element. |
| <span class="prop-name">nextButton</span> | <span class="prop-type">node</span> |  | A next button element. For instance, it can be a `Button` or an `IconButton`. |
| <span class="prop-name">position</span> | <span class="prop-type">'bottom'<br>&#124;&nbsp;'static'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Set the positioning type. |
| <span class="prop-name required">steps<abbr title="required">*</abbr></span> | <span class="prop-type">number</span> |  | The total steps. |
| <span class="prop-name">variant</span> | <span class="prop-type">'dots'<br>&#124;&nbsp;'progress'<br>&#124;&nbsp;'text'</span> | <span class="prop-default">'dots'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiMobileStepper-root</span> | Styles applied to the root element.
| <span class="prop-name">positionBottom</span> | <span class="prop-name">.MuiMobileStepper-positionBottom</span> | Styles applied to the root element if `position="bottom"`.
| <span class="prop-name">positionTop</span> | <span class="prop-name">.MuiMobileStepper-positionTop</span> | Styles applied to the root element if `position="top"`.
| <span class="prop-name">positionStatic</span> | <span class="prop-name">.MuiMobileStepper-positionStatic</span> | Styles applied to the root element if `position="static"`.
| <span class="prop-name">dots</span> | <span class="prop-name">.MuiMobileStepper-dots</span> | Styles applied to the dots container if `variant="dots"`.
| <span class="prop-name">dot</span> | <span class="prop-name">.MuiMobileStepper-dot</span> | Styles applied to each dot if `variant="dots"`.
| <span class="prop-name">dotActive</span> | <span class="prop-name">.MuiMobileStepper-dotActive</span> | Styles applied to a dot if `variant="dots"` and this is the active step.
| <span class="prop-name">progress</span> | <span class="prop-name">.MuiMobileStepper-progress</span> | Styles applied to the Linear Progress component if `variant="progress"`.

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

