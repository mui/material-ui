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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiStepConnector`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiStepConnector-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--horizontal"></a><a href="#css--horizontal" class="prop-name">horizontal</a> | <span class="prop-name">.MuiStepConnector-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiStepConnector-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alternativeLabel"></a><a href="#css--alternativeLabel" class="prop-name">alternativeLabel</a> | <span class="prop-name">.MuiStepConnector-alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--active"></a><a href="#css--active" class="prop-name">active</a> | <span class="prop-name">.MuiStepConnector-active</span> | Pseudo-class applied to the root element if `active={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--completed"></a><a href="#css--completed" class="prop-name">completed</a> | <span class="prop-name">.MuiStepConnector-completed</span> | Pseudo-class applied to the root element if `completed={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--line"></a><a href="#css--line" class="prop-name">line</a> | <span class="prop-name">.MuiStepConnector-line</span> | Styles applied to the line element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--lineHorizontal"></a><a href="#css--lineHorizontal" class="prop-name">lineHorizontal</a> | <span class="prop-name">.MuiStepConnector-lineHorizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--lineVertical"></a><a href="#css--lineVertical" class="prop-name">lineVertical</a> | <span class="prop-name">.MuiStepConnector-lineVertical</span> | Styles applied to the root element if `orientation="vertical"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepConnector/StepConnector.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

