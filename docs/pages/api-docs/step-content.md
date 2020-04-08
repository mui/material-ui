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



## Component name

The `MuiStepContent` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Step content. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the transition. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">'auto'</span> | Adjust the duration of the content expand transition. Passed as a prop to the transition component.<br>Set to 'auto' to automatically calculate transition time based on height. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiStepContent-root</span> | Styles applied to the root element.
| <span class="prop-name">last</span> | <span class="prop-name">.MuiStepContent-last</span> | Styles applied to the root element if `last={true}` (controlled by `Step`).
| <span class="prop-name">transition</span> | <span class="prop-name">.MuiStepContent-transition</span> | Styles applied to the Transition component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepContent/StepContent.js) for more detail.

## Demos

- [Steppers](/components/steppers/)

