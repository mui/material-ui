---
filename: /packages/material-ui/src/StepLabel/StepLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepLabel API

<p class="description">The API documentation of the StepLabel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import StepLabel from '@material-ui/core/StepLabel';
// or
import { StepLabel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | In most cases will simply be a string containing a title for the label. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as disabled, will also disable the button if `StepLabelButton` is a child of `StepLabel`. Is passed to child components. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as failed. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | Override the default label of the step icon. |
| <a class="anchor-link" id="props--optional"></a><a href="#props--optional" class="prop-name">optional</a> | <span class="prop-type">node</span> |  | The optional node to display. |
| <a class="anchor-link" id="props--StepIconComponent"></a><a href="#props--StepIconComponent" class="prop-name">StepIconComponent</a> | <span class="prop-type">elementType</span> |  | The component to render in place of the [`StepIcon`](/api/step-icon/). |
| <a class="anchor-link" id="props--StepIconProps"></a><a href="#props--StepIconProps" class="prop-name">StepIconProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`StepIcon`](/api/step-icon/) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiStepLabel`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiStepLabel-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--horizontal"></a><a href="#css--horizontal" class="prop-name">horizontal</a> | <span class="prop-name">.MuiStepLabel-horizontal</span> | Styles applied to the root element if `orientation="horizontal".
| <a class="anchor-link" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiStepLabel-vertical</span> | Styles applied to the root element if `orientation="vertical".
| <a class="anchor-link" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiStepLabel-label</span> | Styles applied to the `Typography` component which wraps `children`.
| <a class="anchor-link" id="css--active"></a><a href="#css--active" class="prop-name">active</a> | <span class="prop-name">.MuiStepLabel-active</span> | Pseudo-class applied to the `Typography` component if `active={true}`.
| <a class="anchor-link" id="css--completed"></a><a href="#css--completed" class="prop-name">completed</a> | <span class="prop-name">.MuiStepLabel-completed</span> | Pseudo-class applied to the `Typography` component if `completed={true}`.
| <a class="anchor-link" id="css--error"></a><a href="#css--error" class="prop-name">error</a> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element and `Typography` component if `error={true}`.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element and `Typography` component if `disabled={true}`.
| <a class="anchor-link" id="css--iconContainer"></a><a href="#css--iconContainer" class="prop-name">iconContainer</a> | <span class="prop-name">.MuiStepLabel-iconContainer</span> | Styles applied to the `icon` container element.
| <a class="anchor-link" id="css--alternativeLabel"></a><a href="#css--alternativeLabel" class="prop-name">alternativeLabel</a> | <span class="prop-name">.MuiStepLabel-alternativeLabel</span> | Pseudo-class applied to the root and icon container and `Typography` if `alternativeLabel={true}`.
| <a class="anchor-link" id="css--labelContainer"></a><a href="#css--labelContainer" class="prop-name">labelContainer</a> | <span class="prop-name">.MuiStepLabel-labelContainer</span> | Styles applied to the container element which wraps `Typography` and `optional`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepLabel/StepLabel.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

