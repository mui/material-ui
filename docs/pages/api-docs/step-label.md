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



## Component name

The `MuiStepLabel` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | In most cases will simply be a string containing a title for the label. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as disabled, will also disable the button if `StepLabelButton` is a child of `StepLabel`. Is passed to child components. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as failed. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | Override the default label of the step icon. |
| <span class="prop-name">optional</span> | <span class="prop-type">node</span> |  | The optional node to display. |
| <span class="prop-name">StepIconComponent</span> | <span class="prop-type">elementType</span> |  | The component to render in place of the [`StepIcon`](/api/step-icon/). |
| <span class="prop-name">StepIconProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`StepIcon`](/api/step-icon/) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiStepLabel-root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | <span class="prop-name">.MuiStepLabel-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiStepLabel-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiStepLabel-label</span> | Styles applied to the `Typography` component which wraps `children`.
| <span class="prop-name">active</span> | <span class="prop-name">.MuiStepLabel-active</span> | Pseudo-class applied to the `Typography` component if `active={true}`.
| <span class="prop-name">completed</span> | <span class="prop-name">.MuiStepLabel-completed</span> | Pseudo-class applied to the `Typography` component if `completed={true}`.
| <span class="prop-name">error</span> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element and `Typography` component if `error={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element and `Typography` component if `disabled={true}`.
| <span class="prop-name">iconContainer</span> | <span class="prop-name">.MuiStepLabel-iconContainer</span> | Styles applied to the `icon` container element.
| <span class="prop-name">alternativeLabel</span> | <span class="prop-name">.MuiStepLabel-alternativeLabel</span> | Pseudo-class applied to the root and icon container and `Typography` if `alternativeLabel={true}`.
| <span class="prop-name">labelContainer</span> | <span class="prop-name">.MuiStepLabel-labelContainer</span> | Styles applied to the container element which wraps `Typography` and `optional`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepLabel/StepLabel.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

