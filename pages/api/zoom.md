---
filename: /packages/material-ui/src/Zoom/Zoom.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Zoom API

<p class="description">The API documentation of the Zoom React component. Learn more about the properties and the CSS customization points.</p>

```js
import Zoom from '@material-ui/core/Zoom';
```

The Zoom transition can be used for the floating variant of the
[Button](/components/buttons/#floating-action-buttons) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">element</span> |  | A single child content element. |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> |  | If `true`, the component will transition in. |
| <span class="prop-name">timeout</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br></span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/#Transition)).

## Inheritance

The properties of the [Transition](https://reactcommunity.org/react-transition-group/#Transition) component, from react-transition-group, are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Buttons](/components/buttons/)
- [Transitions](/components/transitions/)

