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

## Component name

The `MuiCollapse` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content node to be collapsed. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">collapsedHeight</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> | <span class="prop-default">'0px'</span> | The height of the container when collapsed. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disableStrictModeCompat</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Enable this prop if you encounter 'Function components cannot be given refs', use `unstable_createStrictModeTheme`, and can't forward the ref in the passed `Component`. |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> |  | If `true`, the component will transition in. |
| <span class="prop-name">timeout</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">duration.standard</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">container</span> | <span class="prop-name">.MuiCollapse-container</span> | Styles applied to the container element.
| <span class="prop-name">entered</span> | <span class="prop-name">.MuiCollapse-entered</span> | Styles applied to the container element when the transition has entered.
| <span class="prop-name">hidden</span> | <span class="prop-name">.MuiCollapse-hidden</span> | Styles applied to the container element when the transition has exited and `collapsedHeight` != 0px.
| <span class="prop-name">wrapper</span> | <span class="prop-name">.MuiCollapse-wrapper</span> | Styles applied to the outer wrapper element.
| <span class="prop-name">wrapperInner</span> | <span class="prop-name">.MuiCollapse-wrapperInner</span> | Styles applied to the inner wrapper element.

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

