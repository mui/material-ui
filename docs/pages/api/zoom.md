---
filename: /packages/material-ui/src/Zoom/Zoom.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Zoom API

<p class="description">The API documentation of the Zoom React component. Learn more about the props and the CSS customization points.</p>

```js
import { Zoom } from '@material-ui/core';
```

The Zoom transition can be used for the floating variant of the
[Button](/components/buttons/#floating-action-buttons) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">element</span> |  | A single child content element. |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> |  | If `true`, the component will transition in. |
| <span class="prop-name">timeout</span> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

The props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component, from react-transition-group, are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Buttons](/components/buttons/)
- [Transitions](/components/transitions/)

