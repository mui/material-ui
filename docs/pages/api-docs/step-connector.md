---
filename: /packages/material-ui/src/StepConnector/StepConnector.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepConnector API

<p class="description">The API documentation of the StepConnector React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import StepConnector from '@material-ui/core/StepConnector';
// or
import { StepConnector } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiStepConnector` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiStepConnector-root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | <span class="prop-name">.MuiStepConnector-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiStepConnector-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | <span class="prop-name">.MuiStepConnector-alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.
| <span class="prop-name">active</span> | <span class="prop-name">.MuiStepConnector-active</span> | Pseudo-class applied to the root element if `active={true}`.
| <span class="prop-name">completed</span> | <span class="prop-name">.MuiStepConnector-completed</span> | Pseudo-class applied to the root element if `completed={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">line</span> | <span class="prop-name">.MuiStepConnector-line</span> | Styles applied to the line element.
| <span class="prop-name">lineHorizontal</span> | <span class="prop-name">.MuiStepConnector-lineHorizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">lineVertical</span> | <span class="prop-name">.MuiStepConnector-lineVertical</span> | Styles applied to the root element if `orientation="vertical"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepConnector/StepConnector.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

