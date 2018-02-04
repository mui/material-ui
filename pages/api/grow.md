---
filename: /src/transitions/Grow.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Grow

The Grow transition is used by the Popover component.
It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | union:&nbsp;element&nbsp;&#124;<br>&nbsp;func<br> |  | A single child content element. |
| in | bool |  | If `true`, show the component; triggers the enter or exit animation. |
| timeout | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}&nbsp;&#124;<br>&nbsp;{0?: undefined}<br> | 'auto' | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [&lt;Transition /&gt;](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Popovers](/demos/popovers)

