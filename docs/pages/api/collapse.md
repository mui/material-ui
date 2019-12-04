---
filename: /packages/material-ui/src/Collapse/Collapse.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Collapse API

<p class="description">The API documentation of the Collapse React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Collapse from '@material-ui/core/Collapse';
// or
import { Collapse } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

The Collapse transition is used by the
[Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content node to be collapsed. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--collapsedHeight"></a><a href="#props--collapsedHeight" title="link to the prop on this page" class="prop-name">collapsedHeight</a> | <span class="prop-type">string<br>&#124;&nbsp;number</span> | <span class="prop-default">'0px'</span> | The height of the container when collapsed. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--in"></a><a href="#props--in" title="link to the prop on this page" class="prop-name">in</a> | <span class="prop-type">bool</span> |  | If `true`, the component will transition in. |
| <a class="anchor-link" id="props--timeout"></a><a href="#props--timeout" title="link to the prop on this page" class="prop-name">timeout</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }<br>&#124;&nbsp;'auto'</span> | <span class="prop-default">duration.standard</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## CSS

- Style sheet name: `MuiCollapse`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--container"></a><a href="#css--container" class="prop-name">container</a> | <span class="prop-name">.MuiCollapse-container</span> | Styles applied to the container element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--entered"></a><a href="#css--entered" class="prop-name">entered</a> | <span class="prop-name">.MuiCollapse-entered</span> | Styles applied to the container element when the transition has entered.
| <a class="anchor-link" title="link to the rule name on this page" id="css--hidden"></a><a href="#css--hidden" class="prop-name">hidden</a> | <span class="prop-name">.MuiCollapse-hidden</span> | Styles applied to the container element when the transition has exited and `collapsedHeight` != 0px.
| <a class="anchor-link" title="link to the rule name on this page" id="css--wrapper"></a><a href="#css--wrapper" class="prop-name">wrapper</a> | <span class="prop-name">.MuiCollapse-wrapper</span> | Styles applied to the outer wrapper element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--wrapperInner"></a><a href="#css--wrapperInner" class="prop-name">wrapperInner</a> | <span class="prop-name">.MuiCollapse-wrapperInner</span> | Styles applied to the inner wrapper element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Collapse/Collapse.js) for more detail.

## Inheritance

The props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component, from react-transition-group, are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Cards](/components/cards/)
- [Lists](/components/lists/)
- [Transitions](/components/transitions/)

