---
filename: /packages/material-ui/src/Grow/Grow.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Grow API

<p class="description">The API documentation of the Grow React component. Learn more about the properties and the CSS customization points.</p>

```js
import Grow from '@material-ui/core/Grow';
```

The Grow transition is used by the [Tooltip](/components/tooltips/) and
[Popover](/components/popover/) components.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">element</span> |  | A single child content element. |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> |  | If `true`, show the component; triggers the enter or exit animation. |
| <span class="prop-name">timeout</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br></span> | <span class="prop-default">'auto'</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/#Transition)).

## Inheritance

The properties of the [Transition](https://reactcommunity.org/react-transition-group/#Transition) component, from react-transition-group, are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Popover](/components/popover/)
- [Transitions](/components/transitions/)

