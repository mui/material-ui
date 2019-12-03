---
filename: /packages/material-ui/src/StepIcon/StepIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepIcon API

<p class="description">The API documentation of the StepIcon React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import StepIcon from '@material-ui/core/StepIcon';
// or
import { StepIcon } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--active"></a><a href="#props--active" class="prop-name">active</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Whether this step is active. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--completed"></a><a href="#props--completed" class="prop-name">completed</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as completed. Is passed to child components. |
| <a class="anchor-link" id="props--error"></a><a href="#props--error" class="prop-name">error</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as failed. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name required">icon&nbsp;*</a> | <span class="prop-type">node</span> |  | The label displayed in the step icon. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiStepIcon`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiStepIcon-root</span> | Styles applied to the root element.
| <span class="prop-name">text</span> | <span class="prop-name">.MuiStepIcon-text</span> | Styles applied to the SVG text element.
| <span class="prop-name">active</span> | <span class="prop-name">.MuiStepIcon-active</span> | Pseudo-class applied to the root element if `active={true}`.
| <span class="prop-name">completed</span> | <span class="prop-name">.MuiStepIcon-completed</span> | Pseudo-class applied to the root element if `completed={true}`.
| <span class="prop-name">error</span> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepIcon/StepIcon.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

