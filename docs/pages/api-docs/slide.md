---
filename: /packages/material-ui/src/Slide/Slide.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Slide API

<p class="description">The API documentation of the Slide React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Slide from '@material-ui/core/Slide';
// or
import { Slide } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

The Slide transition is used by the [Drawer](/components/drawers/) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">element</span> |  | A single child content element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">direction</span> | <span class="prop-type">'down'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'up'</span> | <span class="prop-default">'down'</span> | Direction the child node will enter from. |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> |  | If `true`, show the component; triggers the enter or exit animation. |
| <span class="prop-name">timeout</span> | <span class="prop-type">number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

The props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component, from react-transition-group, are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Dialogs](/components/dialogs/)
- [Transitions](/components/transitions/)

