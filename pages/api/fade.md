---
filename: /src/transitions/Fade.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Fade

The Fade transition is used by the Modal component.
It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Element |  | A single child content element. |
| <span style="color: #31a148">in *</span> | boolean |  | If `true`, the component will transition in. |
| timeout | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [&lt;Transition /&gt;](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

