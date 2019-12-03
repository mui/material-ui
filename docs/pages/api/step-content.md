---
filename: /packages/material-ui/src/StepContent/StepContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepContent API

<p class="description">The API documentation of the StepContent React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import StepContent from '@material-ui/core/StepContent';
// or
import { StepContent } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Step content. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the transition. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }<br>&#124;&nbsp;'auto'</span> | <span class="prop-default">'auto'</span> | Adjust the duration of the content expand transition. Passed as a prop to the transition component.<br>Set to 'auto' to automatically calculate transition time based on height. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiStepContent`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiStepContent-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--last"></a><a href="#css--last" class="prop-name">last</a> | <span class="prop-name">.MuiStepContent-last</span> | Styles applied to the root element if `last={true}` (controlled by `Step`).
| <a class="anchor-link" id="css--transition"></a><a href="#css--transition" class="prop-name">transition</a> | <span class="prop-name">.MuiStepContent-transition</span> | Styles applied to the Transition component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepContent/StepContent.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

